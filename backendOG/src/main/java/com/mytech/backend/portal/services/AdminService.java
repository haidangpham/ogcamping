package com.mytech.backend.portal.services;

import java.util.List;

import com.mytech.backend.portal.dto.StatDTO;

public interface AdminService {
    List<StatDTO> getStats(String period);
}