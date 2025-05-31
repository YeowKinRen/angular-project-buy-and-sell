import { Routes } from '@angular/router';
import { ListingsPageComponent } from './listings-page/listings-page.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { EditListingPageComponent } from './edit-listing-page/edit-listing-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { MyListingsPageComponent } from './my-listings-page/my-listings-page.component';
import { NewListingPageComponent } from './new-listing-page/new-listing-page.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    {path:'', redirectTo:'/listings', pathMatch:'full'},
    {path:'listings', component:ListingsPageComponent,pathMatch:'full'},
    {path:'listings/:id', component:ListingDetailComponent},
    {path:'contact/:id', component:ContactPageComponent},
    {path:'edit-listing/:id', component:EditListingPageComponent},
    {path:'my-listings', component:MyListingsPageComponent},
    {path:'new-listing', component:NewListingPageComponent},
    {path:'chat', component:ChatComponent}
];
