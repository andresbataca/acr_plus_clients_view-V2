import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ClearedComponent } from './pages/cleared/cleared.component';
import { CreditSimulatorComponent } from './pages/credit-simulator/credit-simulator.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FAQsComponent } from './pages/FAQs/FAQs.component';
import { BenefitsComponent } from './pages/benefits/Benefits.component';
import { ActiveContestsComponent } from './pages/active-contests/active-contests.component';
import { PaysComponent } from './pages/pays/pays.component';


export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'cleared',
        component: ClearedComponent,
      },
      {
        path: 'credit-simulator',
        component: CreditSimulatorComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'faqs',
        component: FAQsComponent,
      },
      {
        path: 'beneficts',
        component: BenefitsComponent,
      },
      {
        path: 'contest',
        component: ActiveContestsComponent,
      },
      {
        path: 'pays',
        component: PaysComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  }
];
