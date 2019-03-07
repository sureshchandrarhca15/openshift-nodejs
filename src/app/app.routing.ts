import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MainProvidertemplateComponent } from './components/main-provider/main-providertemplate/main-providertemplate.component';

import { RegisterComponent } from './components/register';

const appRoutes: Routes = [
   
    { path: 'login', component: LoginComponent },
   
    { path: 'register', component: RegisterComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'consumer', component: MainPageComponent },
    { path: 'main-provider', component: MainProvidertemplateComponent },
    // otherwise redirect to home
    
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);