import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EntityAuditEvent } from './entity-audit-event.model';

@Injectable()
export class EntityAuditService {

    constructor(private http: HttpClient) { }

    getAllAudited(): Observable<string[]> {
        return this.http.get<string[]>('api/audits/entity/all');
    }

    findByEntity(entity: string, limit: number): Observable<EntityAuditEvent[]> {
        const params = new HttpParams();
        params.set('entityType', entity);
        params.set('limit', limit.toString());

        return this.http.get<EntityAuditEvent[]>('api/audits/entity/changes', { params });
    }

    getPrevVersion(qualifiedName: string, entityId: string, commitVersion: number): Observable<any> {
        const params = new HttpParams();
        params.set('qualifiedName', qualifiedName);
        params.set('entityId', entityId);
        params.set('commitVersion', commitVersion.toString());

        return this.http
            .get('api/audits/entity/changes/version/previous', { params});
    }
}
