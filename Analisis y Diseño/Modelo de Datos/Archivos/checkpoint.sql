-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2019 a las 08:35:48
-- Versión del servidor: 5.6.24
-- Versión de PHP: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `checkpoint`
--
DROP DATABASE IF EXISTS `checkpoint`;
CREATE DATABASE `checkpoint`;
USE `checkpoint`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cambio_estado_valoracion`
--

CREATE TABLE `cambio_estado_valoracion` (
  `idcambio_estado_valoracion` int(11) NOT NULL,
  `estado` enum('creado','terminado','espera','vencido') NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fk_valoracion_hecha_idvaloracion_hecha` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `PERMISO` (
  `idpermiso` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `PERMISO` (`idpermiso`, `nombre`) VALUES
(1, 'Usuarios'),
(2, 'Opciones de valoracion'),
(3, 'Ubicacion'),
(4, 'Habilita en Sector'),
(5, 'Servicios'),
(6, 'Reportes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_habilitar_servicios`
--

CREATE TABLE `registro_habilitar_servicios` (
  `habilitado` tinyint(1) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fk_servicios_idservicios` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_habilitar_valoracion`
--

CREATE TABLE `registro_habilitar_valoracion` (
  `habilitado` tinyint(1) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fk_valoraciones_idvaloraciones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `ROL` (
  `idrol` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `ROL` (`idrol`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Encargado'),
(3, 'Usuario Consulta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_permiso`
--

CREATE TABLE `ROL_PERMISO` (
  `idrol` int(11) NOT NULL,
  `idpermiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol_permiso`
--

INSERT INTO `ROL_PERMISO` (`idrol`, `idpermiso`) VALUES
(1, 1),
(1, 3),
(1, 5),
(2, 2),
(2, 4),
(2, 6),
(3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `idservicios` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL COMMENT 'longitud 20 por tema de mostrar nombre nombre debajo de icono.',
  `email_valoraciones` varchar(45) DEFAULT NULL COMMENT 'puede ser nulo en el caso de que coincida con el del encargado',
  `habilitado` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'al crearse tiene que estar deshabilitado',
  `usuario_idusuario` int(11) NOT NULL,
  `icono` int(11) NOT NULL DEFAULT '0',
  `descripcion` varchar(140) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Estructura de tabla para la tabla `ubicacion`
--

CREATE TABLE `ubicacion` (
  `idubicacion` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `codigo_qr` varchar(45) NOT NULL,
  `fk_ubicacion_idubicacion` int(11) DEFAULT NULL COMMENT 'dependencia de otra ubicacion, para crear jerarquia segun se necesite. Puede ser nulo en caso de que no tenga depencia (ubicacion raiz como ''campus'')'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ubicacion`
--

INSERT INTO `ubicacion` (`idubicacion`, `nombre`, `codigo_qr`, `fk_ubicacion_idubicacion`) VALUES
(1, 'Campus UARG', 'CAMP', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicacion_valoracion`
--

CREATE TABLE `ubicacion_valoracion` (
  `idubicacion_valoracion` int(11) NOT NULL,
  `fk_ubicacion_idubicacion` int(11) NOT NULL,
  `fk_valoraciones_idvaloraciones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `USUARIO` (
  `idusuario` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `metodologin` varchar(25) NOT NULL,
  `estado` enum('Activo','Inactivo') NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `USUARIO` (`idusuario`, `email`, `nombre`, `metodologin`, `estado`) VALUES
(1, 'unpa.checkpoint@gmail.com', 'Administrador', 'Google', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_google`
--

CREATE TABLE `USUARIO_GOOGLE` (
  `idusuario` int(11) NOT NULL,
  `googleid` varchar(255) NOT NULL,
  `imagen` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_manual`
--

CREATE TABLE `USUARIO_MANUAL` (
  `idusuario` int(11) NOT NULL,
  `clave` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_rol`
--

CREATE TABLE `USUARIO_ROL` (
  `idrol` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario_rol`
--

INSERT INTO `USUARIO_ROL` (`idrol`, `idusuario`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoraciones`
--

CREATE TABLE `valoraciones` (
  `idvaloraciones` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `tipo` enum('reclamo','rango') NOT NULL DEFAULT 'reclamo' COMMENT 'si se trata de un reclamo o una calificacion',
  `recibir_notificacion_email` tinyint(1) NOT NULL DEFAULT '1',
  `permite_descripcion` tinyint(1) NOT NULL DEFAULT '0',
  `habilitado` tinyint(1) NOT NULL DEFAULT '0',
  `fk_servicios_idservicios` int(11) NOT NULL,
  `descripcion` varchar(140) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion_hecha`
--

CREATE TABLE `valoracion_hecha` (
  `idvaloracion_hecha` int(11) NOT NULL,
  `ubicacion_valoracion_idubicacion_valoracion` int(11) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `tipo` enum('reclamo','rango') NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion_hecha_rango`
--

CREATE TABLE `valoracion_hecha_rango` (
  `valor` enum('1','2','3','4','5') NOT NULL,
  `idvaloracion_hecha` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion_hecha_reclamo`
--

CREATE TABLE `valoracion_hecha_reclamo` (
  `url_imagen` varchar(45) DEFAULT NULL,
  `email_devolucion` varchar(75) DEFAULT NULL,
  `idvaloracion_hecha` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion_rango`
--

CREATE TABLE `valoracion_rango` (
  `tipo_valores` enum('numerico','emoticon','texto') NOT NULL DEFAULT 'numerico',
  `valoraciones_idvaloraciones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion_reclamo`
--

CREATE TABLE `valoracion_reclamo` (
  `permite_foto` tinyint(1) NOT NULL,
  `permite_email` tinyint(1) NOT NULL,
  `vencimiento` tinyint(1) NOT NULL,
  `valoraciones_idvaloraciones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cambio_estado_valoracion`
--
ALTER TABLE `cambio_estado_valoracion`
  ADD PRIMARY KEY (`idcambio_estado_valoracion`),
  ADD UNIQUE KEY `unico` (`estado`,`fk_valoracion_hecha_idvaloracion_hecha`),
  ADD KEY `fk_cambio_estado_valoracion_valoracion_hecha1_idx` (`fk_valoracion_hecha_idvaloracion_hecha`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `PERMISO`
  ADD PRIMARY KEY (`idpermiso`),
  ADD UNIQUE KEY `ID_PERMISO_IND` (`idpermiso`);

--
-- Indices de la tabla `registro_habilitar_servicios`
--
ALTER TABLE `registro_habilitar_servicios`
  ADD PRIMARY KEY (`habilitado`,`fecha`,`fk_servicios_idservicios`),
  ADD KEY `fk_registro_habilitar_servicios_servicios1_idx` (`fk_servicios_idservicios`);

--
-- Indices de la tabla `registro_habilitar_valoracion`
--
ALTER TABLE `registro_habilitar_valoracion`
  ADD PRIMARY KEY (`habilitado`,`fecha`,`fk_valoraciones_idvaloraciones`),
  ADD KEY `fk_reg_habilitar_valoracion_valoraciones1_idx` (`fk_valoraciones_idvaloraciones`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `ROL`
  ADD PRIMARY KEY (`idrol`),
  ADD UNIQUE KEY `ID_ROL_IND` (`idrol`);

--
-- Indices de la tabla `rol_permiso`
--
ALTER TABLE `ROL_PERMISO`
  ADD PRIMARY KEY (`idpermiso`,`idrol`),
  ADD UNIQUE KEY `ID_ROL_PERMISO_IND` (`idpermiso`,`idrol`),
  ADD KEY `FKASO_ROL_IND` (`idrol`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`idservicios`,`usuario_idusuario`),
  ADD UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  ADD KEY `fk_servicios_usuario1_idx` (`usuario_idusuario`);

--
-- Indices de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD PRIMARY KEY (`idubicacion`),
  ADD UNIQUE KEY `nombre_UNIQUE` (`nombre`,`fk_ubicacion_idubicacion`),
  ADD KEY `fk_ubicacion_ubicacion1_idx` (`fk_ubicacion_idubicacion`);

--
-- Indices de la tabla `ubicacion_valoracion`
--
ALTER TABLE `ubicacion_valoracion`
  ADD PRIMARY KEY (`idubicacion_valoracion`),
  ADD UNIQUE KEY `unico` (`fk_ubicacion_idubicacion`,`fk_valoraciones_idvaloraciones`),
  ADD KEY `fk_ubicacion_valoracion_ubicacion1_idx` (`fk_ubicacion_idubicacion`),
  ADD KEY `fk_ubicacion_valoracion_valoraciones1_idx` (`fk_valoraciones_idvaloraciones`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `USUARIO`
  ADD PRIMARY KEY (`idusuario`),
  ADD UNIQUE KEY `UN_USUARIO` (`email`,`nombre`),
  ADD UNIQUE KEY `ID_USUARIO_IND` (`idusuario`);

--
-- Indices de la tabla `usuario_google`
--
ALTER TABLE `USUARIO_GOOGLE`
  ADD PRIMARY KEY (`idusuario`),
  ADD UNIQUE KEY `SID_USUARIO_GOOGLE_ID` (`googleid`),
  ADD UNIQUE KEY `SID_USUARIO_GOOGLE_IND` (`googleid`),
  ADD UNIQUE KEY `FKUSU_USU_1_IND` (`idusuario`);

--
-- Indices de la tabla `usuario_manual`
--
ALTER TABLE `USUARIO_MANUAL`
  ADD PRIMARY KEY (`idusuario`),
  ADD UNIQUE KEY `FKUSU_USU_IND` (`idusuario`);

--
-- Indices de la tabla `usuario_rol`
--
ALTER TABLE `USUARIO_ROL`
  ADD PRIMARY KEY (`idrol`,`idusuario`),
  ADD UNIQUE KEY `ID_USUARIO_ROL_IND` (`idrol`,`idusuario`),
  ADD KEY `FKVIN_USU_IND` (`idusuario`);

--
-- Indices de la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  ADD PRIMARY KEY (`idvaloraciones`),
  ADD KEY `fk_valoraciones_servicios1_idx` (`fk_servicios_idservicios`);

--
-- Indices de la tabla `valoracion_hecha`
--
ALTER TABLE `valoracion_hecha`
  ADD PRIMARY KEY (`idvaloracion_hecha`),
  ADD UNIQUE KEY `fecha_UNIQUE` (`fecha`),
  ADD KEY `fk_valoracion_hecha_ubicacion_valoracion1_idx` (`ubicacion_valoracion_idubicacion_valoracion`);

--
-- Indices de la tabla `valoracion_hecha_rango`
--
ALTER TABLE `valoracion_hecha_rango`
  ADD PRIMARY KEY (`idvaloracion_hecha`);

--
-- Indices de la tabla `valoracion_hecha_reclamo`
--
ALTER TABLE `valoracion_hecha_reclamo`
  ADD KEY `fk_valoracion_hecha_reclamo_valoracion_hecha1_idx` (`idvaloracion_hecha`);

--
-- Indices de la tabla `valoracion_rango`
--
ALTER TABLE `valoracion_rango`
  ADD PRIMARY KEY (`valoraciones_idvaloraciones`);

--
-- Indices de la tabla `valoracion_reclamo`
--
ALTER TABLE `valoracion_reclamo`
  ADD PRIMARY KEY (`valoraciones_idvaloraciones`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cambio_estado_valoracion`
--
ALTER TABLE `cambio_estado_valoracion`
  MODIFY `idcambio_estado_valoracion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `PERMISO`
  MODIFY `idpermiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `ROL`
  MODIFY `idrol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `idservicios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `idubicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ubicacion_valoracion`
--
ALTER TABLE `ubicacion_valoracion`
  MODIFY `idubicacion_valoracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `USUARIO`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  MODIFY `idvaloraciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT de la tabla `valoracion_hecha`
--
ALTER TABLE `valoracion_hecha`
  MODIFY `idvaloracion_hecha` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cambio_estado_valoracion`
--
ALTER TABLE `cambio_estado_valoracion`
  ADD CONSTRAINT `fk_cambio_estado_valoracion_valoracion_hecha1` FOREIGN KEY (`fk_valoracion_hecha_idvaloracion_hecha`) REFERENCES `valoracion_hecha` (`idvaloracion_hecha`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `registro_habilitar_servicios`
--
ALTER TABLE `registro_habilitar_servicios`
  ADD CONSTRAINT `fk_registro_habilitar_servicios_servicios1` FOREIGN KEY (`fk_servicios_idservicios`) REFERENCES `servicios` (`idservicios`);

--
-- Filtros para la tabla `registro_habilitar_valoracion`
--
ALTER TABLE `registro_habilitar_valoracion`
  ADD CONSTRAINT `fk_reg_habilitar_valoracion_valoraciones1` FOREIGN KEY (`fk_valoraciones_idvaloraciones`) REFERENCES `valoraciones` (`idvaloraciones`);

--
-- Filtros para la tabla `rol_permiso`
--
ALTER TABLE `ROL_PERMISO`
  ADD CONSTRAINT `FKASO_PER` FOREIGN KEY (`idpermiso`) REFERENCES `PERMISO` (`idpermiso`),
  ADD CONSTRAINT `FKASO_ROL_FK` FOREIGN KEY (`idrol`) REFERENCES `ROL` (`idrol`);

--
-- Filtros para la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD CONSTRAINT `fk_servicios_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `USUARIO` (`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD CONSTRAINT `fk_ubicacion_ubicacion1` FOREIGN KEY (`fk_ubicacion_idubicacion`) REFERENCES `ubicacion` (`idubicacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ubicacion_valoracion`
--
ALTER TABLE `ubicacion_valoracion`
  ADD CONSTRAINT `fk_ubicacion_valoracion_ubicacion1` FOREIGN KEY (`fk_ubicacion_idubicacion`) REFERENCES `ubicacion` (`idubicacion`),
  ADD CONSTRAINT `fk_ubicacion_valoracion_valoraciones1` FOREIGN KEY (`fk_valoraciones_idvaloraciones`) REFERENCES `valoraciones` (`idvaloraciones`);

--
-- Filtros para la tabla `usuario_google`
--
ALTER TABLE `USUARIO_GOOGLE`
  ADD CONSTRAINT `FKUSU_USU_1_FK` FOREIGN KEY (`idusuario`) REFERENCES `USUARIO` (`idusuario`);

--
-- Filtros para la tabla `usuario_manual`
--
ALTER TABLE `USUARIO_MANUAL`
  ADD CONSTRAINT `FKUSU_USU_FK` FOREIGN KEY (`idusuario`) REFERENCES `USUARIO` (`idusuario`);

--
-- Filtros para la tabla `usuario_rol`
--
ALTER TABLE `USUARIO_ROL`
  ADD CONSTRAINT `FKVIN_ROL` FOREIGN KEY (`idrol`) REFERENCES `ROL` (`idrol`),
  ADD CONSTRAINT `FKVIN_USU_FK` FOREIGN KEY (`idusuario`) REFERENCES `USUARIO` (`idusuario`);

--
-- Filtros para la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  ADD CONSTRAINT `fk_valoraciones_servicios1` FOREIGN KEY (`fk_servicios_idservicios`) REFERENCES `servicios` (`idservicios`);

--
-- Filtros para la tabla `valoracion_hecha`
--
ALTER TABLE `valoracion_hecha`
  ADD CONSTRAINT `fk_valoracion_hecha_ubicacion_valoracion1` FOREIGN KEY (`ubicacion_valoracion_idubicacion_valoracion`) REFERENCES `ubicacion_valoracion` (`idubicacion_valoracion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `valoracion_hecha_rango`
--
ALTER TABLE `valoracion_hecha_rango`
  ADD CONSTRAINT `fk_valoracion_hecha_rango_valoracion_hecha1` FOREIGN KEY (`idvaloracion_hecha`) REFERENCES `valoracion_hecha` (`idvaloracion_hecha`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `valoracion_hecha_reclamo`
--
ALTER TABLE `valoracion_hecha_reclamo`
  ADD CONSTRAINT `fk_valoracion_hecha_reclamo_valoracion_hecha1` FOREIGN KEY (`idvaloracion_hecha`) REFERENCES `valoracion_hecha` (`idvaloracion_hecha`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `valoracion_rango`
--
ALTER TABLE `valoracion_rango`
  ADD CONSTRAINT `fk_valoracion_rango_valoraciones1` FOREIGN KEY (`valoraciones_idvaloraciones`) REFERENCES `valoraciones` (`idvaloraciones`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `valoracion_reclamo`
--
ALTER TABLE `valoracion_reclamo`
  ADD CONSTRAINT `fk_valoracion_reclamo_valoraciones1` FOREIGN KEY (`valoraciones_idvaloraciones`) REFERENCES `valoraciones` (`idvaloraciones`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
