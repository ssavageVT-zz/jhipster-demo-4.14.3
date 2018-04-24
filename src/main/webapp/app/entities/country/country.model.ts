import { BaseEntity } from './../../shared';

export class Country implements BaseEntity {
    constructor(
        public id?: number,
        public countryName?: string,
        public regionRegionName?: string,
        public regionId?: number,
    ) {
    }
}
