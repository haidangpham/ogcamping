package com.mytech.backend.portal.apis;

import com.mytech.backend.portal.dto.BookingDTO;
import com.mytech.backend.portal.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/apis/v1/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping
    public List<BookingDTO> getBookings() {
        return bookingService.getBookings();
    }
}