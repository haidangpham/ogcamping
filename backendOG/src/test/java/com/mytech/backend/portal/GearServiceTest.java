package com.mytech.backend.portal;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import com.github.javafaker.Faker;
import com.mytech.backend.portal.dto.GearDTO;
import com.mytech.backend.portal.models.Area.AreaName;
import com.mytech.backend.portal.models.Category.CategoryName;
import com.mytech.backend.portal.models.Gear.GearStatus;
import com.mytech.backend.portal.services.GearService;

@SpringBootTest
@Rollback(false)
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class GearServiceTest {

    @Autowired
    private GearService gearService;

    private Faker faker;

    @BeforeEach
    void setUp() {
        faker = new Faker();
    }

    @Test
    public void testCreate50Gears() {
        List<GearDTO> gears = new ArrayList<>();
        Random random = new Random();
        CategoryName[] categoryNames = CategoryName.values();
        AreaName[] areaNames = AreaName.values();
        GearStatus[] gearStatuses = GearStatus.values();

        for (int i = 0; i < 50; i++) {
            GearDTO gear = new GearDTO();
            gear.setName(faker.commerce().productName());
            gear.setCategory(categoryNames[random.nextInt(categoryNames.length)]);
            gear.setArea(areaNames[random.nextInt(areaNames.length)]);
            gear.setDescription(faker.lorem().sentence(10));
            gear.setQuantityInStock(random.nextInt(100) + 1);
            gear.setImage("/uploads/gears/placeholder_" + i + ".jpg"); // Use local placeholder
            gear.setAvailable(random.nextInt(gear.getQuantityInStock() + 1));
            gear.setPricePerDay(random.nextDouble() * 100.0);
            gear.setTotal(random.nextInt(200));
            gear.setStatus(gearStatuses[random.nextInt(gearStatuses.length)]);
            gear.setCreatedAt(LocalDateTime.now());

            gears.add(gear);
            gearService.createGear(gear);
        }
    }
}