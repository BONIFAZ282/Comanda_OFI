export interface MenuItem {
  ID_PLATO: number;
  ID_CATEGORIA: number;
  NOMBRE: string;
  DESCRIPCION: string;
  PRECIO: number;
}

export interface Pedido {
  ID_PEDIDO: number;
  ID_MESA: number;
  ID_TRABAJADOR: number;
  F_PEDIDO: string;
  ESTADO: string;
  TOTAL: number;
}

export interface DetallePedido {
  ID_DETALLE_PEDIDO: number;
  ID_PEDIDO: number;
  ID_PLATO: number;
  NOMBRE_PLATO: string;
  CANTIDAD: number;
  PRECIO: number;
  SUBTOTAL: number;
}

export interface Categoria {
  ID_CATEGORIA: number;
  NOM_CATEGORIA: string;
}

export interface Mesa {
  ID_MESA: number;
  NUMERO: number;
  CAPACIDAD: number;
}

export interface Trabajador {
  ID_TRABAJADOR: number;
  ID_ROL: number;
  ROL: string;
  ID_PERSONA: number;
  NOMBRES: string;
  APPATERNO: string;
  APMATERNO: string;
  DOCUMENTO: string;
  CORREO: string;
  TELEFONO: string;
  CONTRASENIA: string;
  ID_USUARIO: number;
  ID_PRIVILEGIO: number;
}

export interface TrabajadorPorRol {
  NOM_ROL: string;
  CANTIDAD: number;
}

export interface Rol {
  ID_ROL: number;
  NOM_ROL: string;
}


export interface Usuario {
  DOCUMENTO: string;
  NOMBRES: string;
  APPATERNO: string;
  APMATERNO: string;
  PASSWORD: string;
  NOMBRE_ROL: string;
  token?: string; // Asegúrate de que el token está incluido
}

