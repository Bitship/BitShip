import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package.service';
import { ShipmentTransferService } from '../../../services/shipmentTransfer.service';

import { Router } from '@angular/router';

@Component({
    selector: 'app-viewPackages',
    templateUrl: './companyPackages.component.html',
    styleUrls: ['./companyPackages.component.css'],
    providers: [PackageService, ShipmentTransferService]
})
export class CompanyPackagesComponent implements OnInit {
    private packages;
    private errorMessage;
    private shipmentTransfer;
    private selectedPackages: Array<string> = [];
    private status: string;
    private stringSelectedPackages: string;
    private vehicleId = 'toyotaTruck';

    constructor(private packageService: PackageService, private shipmentTransferService: ShipmentTransferService, private router: Router) {
    }

    ngOnInit() {
        this.status = 'PENDING';
        this.loadPendingPackages(this.status);
    }

    loadPendingPackages(status: string): Promise<any> {
        let tempList = [];
        return this.packageService.getAssetsWithStatus(status)
            .toPromise()
            .then((result) => {
                this.errorMessage = null;
                result.forEach(asset => {
                    tempList.push(asset);
                });
                this.packages = tempList;
            })
            .catch((error) => {
            });
    }

    submitShipmentTransfer(): Promise<any> {
        this.shipmentTransfer = {
            '$class': 'org.bitship.ShipmentTransfer',
            'vehicle': this.vehicleId,
            'packages': this.selectedPackages,
            'status': 'ASSIGN'
        }

        return this.shipmentTransferService
            .postShipmentTransaction(this.shipmentTransfer)
            .toPromise()
            .then((result) => {
                this.loadPendingPackages(this.status);
                this.selectedPackages = [];
            })
            .catch ((error) => {
                console.error(error);
            });
    }

    addPackages(packageId: any) {
        console.log('Package: ', packageId);
        for (const item of this.selectedPackages) {
            if (item === packageId) {
                return;
            }
        }
        this.selectedPackages.push(packageId);
        this.renderListPackages();
    }

    removePackages(packageId: any) {
        for (let j = 0; j < this.selectedPackages.length; j++) {
            if (this.selectedPackages[j] === packageId) {
                this.selectedPackages.splice(j, 1);
                break;
            }
        }
        this.renderListPackages();
    }

    renderListPackages() {
        this.stringSelectedPackages = '';
        for (const packageId of this.selectedPackages) {
            this.stringSelectedPackages += '---' +  packageId;
        }
    }

    clickPendingFilter() {
        this.status = 'PENDING';
        this.loadPendingPackages(this.status);
        this.selectedPackages = [];
        this.stringSelectedPackages = '';
    }

    clickInWarehouseFilter() {
        this.status = 'IN_WAREHOUSE';
        this.loadPendingPackages(this.status);
        this.selectedPackages = [];
        this.stringSelectedPackages = '';
    }

}
