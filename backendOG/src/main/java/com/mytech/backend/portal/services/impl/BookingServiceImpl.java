package com.mytech.backend.portal.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mytech.backend.portal.dto.BookingDTO;
import com.mytech.backend.portal.repositories.BookingRepository;
import com.mytech.backend.portal.services.BookingService;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;
   
    @Override
    public List<BookingDTO> getBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(booking -> new BookingDTO(
                        booking.getId(),
                        booking.getUser().getName(),
                        booking.getService(),
                        booking.getDate(),
                        booking.getImage(),
                        booking.getStatus().name(),
                        booking.getAmount(),
                        booking.getRating(),
                        booking.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }
}