import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import {LandingProviderPageComponent} from './components/main-provider/landing-provider-page/landing-provider-page.component';
import { LeftPaneInfoComponent } from './components/left-pane-info/left-pane-info.component';
import { AgmCoreModule, MapsAPILoader  } from '@agm/core';
import { GLOBAL_VARIABLE } from './global';
import { AgmDirectionModule } from 'agm-direction';
import { MaidInformationComponent } from './components/maid-information/maid-information.component' ;
import { routing }        from './app.routing';

import { LoginComponent } from './components/login';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { BookingComponent } from './components/booking/booking.component';
import { RegisterComponent } from './components/register/register.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HeaderComponent } from './components/global/header/header.component';
import { FooterComponent } from './components/global/footer/footer.component';
import { MainProvidertemplateComponent } from './components/main-provider/main-providertemplate/main-providertemplate.component';
import { HistoryComponentComponent } from './components/history-component/history-component.component';

@NgModule({

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    routing,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCoPXBL4PpQc35PCHE_KoAXSyfvxJK5tsQ',
      libraries: ['geometry']
    }),
    AgmDirectionModule
  ],
declarations: [
        AppComponent,
        LoginComponent,
        ForgotPasswordComponent ,
        ResetPasswordComponent,
    LandingPageComponent,
    LandingProviderPageComponent,
		LeftPaneInfoComponent,
		MaidInformationComponent,
		BookingComponent,
		RegisterComponent,
		MainPageComponent,
		HeaderComponent,
		FooterComponent,
		MainProvidertemplateComponent,
		HistoryComponentComponent		],
  providers: [ GLOBAL_VARIABLE],
  bootstrap: [AppComponent]
})
export class AppModule { }