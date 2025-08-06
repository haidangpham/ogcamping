package com.mytech.backend.portal.apis;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mytech.backend.portal.dto.GearDTO;
import com.mytech.backend.portal.services.GearService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping({"/apis/v1/gears", "/apis/test/gears"})
@RequiredArgsConstructor
public class GearController {
	@Autowired
    private GearService gearService;

    @PostMapping
    public ResponseEntity<GearDTO> create(@RequestBody GearDTO dto) {
        return ResponseEntity.ok(gearService.createGear(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<GearDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(gearService.getGearById(id));
    }

    @GetMapping
    public ResponseEntity<List<GearDTO>> getAll() {
        return ResponseEntity.ok(gearService.getAllGears());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GearDTO> update(@PathVariable Long id, @RequestBody GearDTO dto) {
        return ResponseEntity.ok(gearService.updateGear(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        gearService.deleteGear(id);
        return ResponseEntity.noContent().build();
    }
}
