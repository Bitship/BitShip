import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { CreatePackageComponent } from './screens/sender/createPackage/createPackage.component';
import { ShowPackagesComponent } from './screens/sender/packages/showPackages.component';
import { PackageDetailComponent } from './components/packageDetail/packageDetail.component';
import { CompanyPackagesComponent } from './screens/shipmentCompany/packages/companyPackages.component';
import { VehiclePackagesComponent } from './screens/shipmentVehicle/packages/vehiclePackages.component';
import { InspectorPackagesComponent } from './screens/inspector/inspectorPackages/inspectorPackages.component';
import { DeliverPackageComponent } from './screens/shipmentVehicle/delivers/deliverPackage.component';

const routesConfig: Routes = [
    {
        path: 'sender',
        children: [
            { path: '', component: ShowPackagesComponent },
            { path: 'create', component: CreatePackageComponent },
            { path: 'package/:id', component: PackageDetailComponent}
        ]
    },
    {
        path: 'shipmentCompany',
        children: [
            { path: '', component: CompanyPackagesComponent },
            { path: 'package/:id', component: PackageDetailComponent}
        ]
    },
    {
        path: 'shipmentVehicle/:vehicleId',
        children: [
            { path: '', component: VehiclePackagesComponent },
            { path: 'delivers', component: DeliverPackageComponent },
            { path: 'package/:id', component: PackageDetailComponent}
        ]
    },
    {
        path: 'inspector',
        children: [
            { path: '', component: InspectorPackagesComponent},
            { path: 'package/:id', component: PackageDetailComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routesConfig)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule { }

