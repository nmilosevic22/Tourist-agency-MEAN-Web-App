import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { OwnerComponent } from './owner/owner.component';
import { TouristComponent } from './tourist/tourist.component';
import { LogadminComponent } from './logadmin/logadmin.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PasswordComponent } from './password/password.component';
import { CottagesComponent } from './cottages/cottages.component';
import { DetailComponent } from './detail/detail.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { OwnercottagesComponent } from './ownercottages/ownercottages.component';
import { OwnerresComponent } from './ownerres/ownerres.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "admin", component: AdminComponent},
    {path: "owner", component: OwnerComponent},
    {path: "tourist", component: TouristComponent},
    {path: "logadmin", component: LogadminComponent},
    {path: "register", component: RegisterComponent},
    {path: "", component: HomeComponent},
    {path: "change", component: PasswordComponent},
    {path: "cottages", component: CottagesComponent},
    {path: "detail", component: DetailComponent},
    {path: "reservations", component: ReservationsComponent},
    {path: "ownerCottages", component: OwnercottagesComponent},
    {path: "ownerres", component: OwnerresComponent},
];
