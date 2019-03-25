import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { 
    path: 'acerca', 
    loadChildren: './acerca/acerca.module#AcercaPageModule' 
  },
  {   

    path: 'confirmacion/:valoracion'+
                      '/:valor'+
                      '/:tipo'+
                      '/:idubicacion_valoracion'+
                      '/:nombreservicio'+
                      '/:tipo_rango'+
                      '/:nombre_ubicacion'+
                      '/:foto'+
                      '/:base64Image'+
                      '/:email'+
                      '/:descripcion', 
    loadChildren: './confirmacion/confirmacion.module#ConfirmacionPageModule' 
  },
  { 
    path: 'opcionales/:valoracion'+
                     '/:valor'+
                     '/:tipo'+
                     '/:permite_descripcion'+
                     '/:permite_foto'+
                     '/:permite_email'+
                     '/:idubicacion_valoracion'+
                     '/:tipo_rango'+
                     '/:nombre_ubicacion'+
                     '/:nombreservicio', 
    loadChildren: './opcionales/opcionales.module#OpcionalesPageModule' 
  },
  { 
    path: 'servicios/:ubicacion', 
    loadChildren: './servicios/servicios.module#ServiciosPageModule' 
  },
  { 
    path: 'ubmanual/:servicio'+
                  '/:descripcion'+
                  '/:nombre'+
                  '/:icono', 
    loadChildren: './ubmanual/ubmanual.module#UbmanualPageModule' 
  },
  { 
    path: 'valoraciones/:servicio'+
                      '/:descripcion'+
                      '/:nombre'+
                      '/:icono'+
                      '/:ubicacion'+
                      '/:idUbicacion', 
    loadChildren: './valoraciones/valoraciones.module#ValoracionesPageModule' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
