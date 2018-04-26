import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Region } from './region.model';
import { RegionPopupService } from './region-popup.service';
import { RegionService } from './region.service';

@Component({
    selector: 'jhi-region-dialog',
    templateUrl: './region-dialog.component.html'
})
export class RegionDialogComponent implements OnInit {

    region: Region;
    isSaving: boolean;

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private regionService: RegionService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.load(params['id']);
            } else {
                this.region = new Region();
            }
        });

        this.registerChangeInRegions();
    }

    load(id) {
        this.regionService.find(id)
            .subscribe((regionResponse: HttpResponse<Region>) => {
                this.region = regionResponse.body;
            });
    }

    previousState() {
        window.history.back();
    }

    clear() {
        // this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.region.id !== undefined) {
            this.subscribeToSaveResponse(
                this.regionService.update(this.region));
        } else {
            this.subscribeToSaveResponse(
                this.regionService.create(this.region));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Region>>) {
        result.subscribe((res: HttpResponse<Region>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Region) {
        this.eventManager.broadcast({ name: 'regionListModification', content: 'OK'});
        this.isSaving = false;
        // this.activeModal.dismiss(result);
        this.router.navigate(['region']);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    registerChangeInRegions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'regionListModification',
            (response) => this.load(this.region.id)
        );
    }
}

@Component({
    selector: 'jhi-region-popup',
    template: ''
})
export class RegionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private regionPopupService: RegionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.regionPopupService
                    .open(RegionDialogComponent as Component, params['id']);
            } else {
                this.regionPopupService
                    .open(RegionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
