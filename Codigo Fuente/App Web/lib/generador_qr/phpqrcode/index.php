  <?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
	//Agregamos la libreria para genera códigos QR
	require "./qrlib.php";   
	
	//Agregamos la libreria para generar PDF
	require "./fpdf/fpdf.php"; 

	$pdf = new FPDF('P','mm','A4');
	$pdf->AddPage();        
	$pdf->Image('./fpdf/plantillaQR.jpg',0,0,210,297);
	
	// -------------------------------------------------------------------
	//RECUPERAR DATOS DEL FORMULARIO
        $nombre = $str = iconv('UTF-8', 'windows-1252', $_POST['nombre']);
	$codigoQr = $_POST['actualid'];
        $destino = $_POST['destino']; 
        $descargable = isset($_POST['descargar']) ? TRUE : FALSE;
	// -------------------------------------------------------------------

	
	//Declaramos una carpeta temporal para guardar la imagenes generadas
	$dir = '../../../imagenes/temp/';
	
	//Si no existe la carpeta la creamos
	if (!file_exists($dir))
        mkdir($dir);
	
        //Declaramos la ruta y nombre del archivo a generar
	$filename = $dir.$nombre.'.png';
        //$filenameqr = $dir.$nombre.'.pdf';
        $filenameqr = $codigoQr.'.pdf';
 
        //Parametros de Condiguración
	
	$tamaño = 10; //Tamaño de Pixel
	$level = 'L'; //Precisión L= Baja, M = Media, Q = Alta, H = Maxima
	$framSize = 3; //Tamaño en blanco
	$contenido = $codigoQr; //Texto Contenido
	
        //Enviamos los parametros a la Función para generar código QR 
	QRcode::png($contenido, $filename, $level, $tamaño, $framSize); 
	
	$pdf->Image('./'.$filename,45,40,120,120);
        
        //agregado del texto descriptivo
        $pdf->SetFont('Arial','B',20);
        $pdf->SetXY(60, 150);
        $pdf->Cell(90,10,'"'.$nombre.'"',0,1,'C');
        
        if($descargable){
            //$pdf->Output('D','./'.$dir.$nombre.'.pdf');
            $pdf->Output('D','./'.$codigoQr.'.pdf');
        }else{
            $pdf->Output('F','./'.$dir.$nombre.'.pdf');
        }
	
        $existe = is_file('./'.$dir.$nombre.'.pdf');
        if($existe){
             $data = ['respuesta' => "si", 'nombre' => ($nombre.'.pdf'),'causa' => "normal"];
        }else{
            $data = ['respuesta' => "no", 'causa' => "varias"];
        }
       
        echo(json_encode($data));
?>