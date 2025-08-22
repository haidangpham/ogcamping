package com.mytech.backend.portal.apis;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.mytech.backend.portal.jwt.JwtUtils;
import com.mytech.backend.portal.services.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private FirebaseService firebaseService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/exchange")
    public ResponseEntity<?> exchangeToken(@RequestBody Map<String, String> body) {
        try {
            String firebaseToken = body.get("idToken"); // frontend gửi Firebase ID Token             
            FirebaseToken decodedToken = firebaseService.verifyIdToken(firebaseToken);
            
            // Lấy thông tin từ Firebase
            String uid = decodedToken.getUid();
            String email = decodedToken.getEmail();
            String role= "USER";
            
            //Tạo user
            Map<String, Object> user = new HashMap<>();
            user.put("uid", uid);
            user.put("email", email);
            user.put("role", role);

            // Generate JWT cũ (HS256) để service khác dùng
            String oldJwt = jwtUtils.generateTokenFromEmail(email);

            Map<String, Object> res = new HashMap<>();
            res.put("jwt", oldJwt);
            res.put("uid", uid);
            res.put("user", user);
            
            return ResponseEntity.ok(res);

        } catch (FirebaseAuthException e) {
        	//luôn return dạng JSON
        	Map<String, Object> error = new HashMap<>();
            error.put("error", "Invalid Firebase Token");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
