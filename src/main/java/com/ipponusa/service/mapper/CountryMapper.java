package com.ipponusa.service.mapper;

import com.ipponusa.domain.*;
import com.ipponusa.service.dto.CountryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Country and its DTO CountryDTO.
 */
@Mapper(componentModel = "spring", uses = {RegionMapper.class})
public interface CountryMapper extends EntityMapper<CountryDTO, Country> {

    @Mapping(source = "region.id", target = "regionId")
    @Mapping(source = "region.regionName", target = "regionRegionName")
    CountryDTO toDto(Country country);

    @Mapping(source = "regionId", target = "region")
    Country toEntity(CountryDTO countryDTO);

    default Country fromId(Long id) {
        if (id == null) {
            return null;
        }
        Country country = new Country();
        country.setId(id);
        return country;
    }
}
