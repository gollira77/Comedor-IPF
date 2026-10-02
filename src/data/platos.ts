export type Categoria = "desayuno" | "almuerzo" | "bebidas" | "kiosco";

export const CATEGORIAS: Categoria[] = [
    "desayuno",
    "almuerzo",
    "bebidas",
    "kiosco",
];

export interface Plato {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    categoria: Categoria;
}

export const platos: Plato[] = [
  // DESAYUNO
    {
        id: 1,
        nombre: "Chipá",
        precio: 500,
        descripcion: "Rico y caliente, recién salido del horno.",
        categoria: "desayuno",
    },
    {
        id: 2,
        nombre: "Café con leche",
        precio: 800,
        descripcion: "Taza grande con leche espumosa.",
        categoria: "desayuno",
    },
    {
        id: 3,
        nombre: "Medialunas (x3)",
        precio: 900,
        descripcion: "Tres medialunas de manteca.",
        categoria: "desayuno",
    },

    // ALMUERZO
    {
        id: 4,
        nombre: "Milanesa con puré",
        precio: 2500,
        descripcion: "Milanesa de ternera con puré de papa casero.",
        categoria: "almuerzo",
    },
    {
        id: 5,
        nombre: "Guiso de lentejas",
        precio: 2200,
        descripcion: "Guiso casero con panceta y chorizo.",
        categoria: "almuerzo",
    },
    {
        id: 6,
        nombre: "Pastel de papa",
        precio: 2300,
        descripcion: "Clásico pastel de papa con carne picada.",
        categoria: "almuerzo",
    },

    // BEBIDAS
    {
        id: 7,
        nombre: "Agua mineral",
        precio: 500,
        descripcion: "Botella de 500 ml, sin gas.",
        categoria: "bebidas",
    },
    {
        id: 8,
        nombre: "Gaseosa",
        precio: 700,
        descripcion: "Lata de 354 ml. Sabores varios.",
        categoria: "bebidas",
    },
    {
        id: 9,
        nombre: "Jugo de naranja",
        precio: 900,
        descripcion: "Jugo natural recién exprimido.",
        categoria: "bebidas",
    },

    // KIOSCO
    {
        id: 10,
        nombre: "Alfajor triple",
        precio: 600,
        descripcion: "Alfajor de dulce de leche con tres tapas.",
        categoria: "kiosco",
    },
    {
        id: 11,
        nombre: "Chocolatín",
        precio: 400,
        descripcion: "Chocolate con leche en barra.",
        categoria: "kiosco",
    },
    {
        id: 12,
        nombre: "Papas fritas (bolsa)",
        precio: 800,
        descripcion: "Bolsa de 80 g. Clásicas o con sabor.",
        categoria: "kiosco",
    },
];

export function buscarPlato(id: number): Plato | undefined {
    return platos.find((p) => p.id === id);
}


export function platosPorCategoria(cat: Categoria): Plato[] {
    return platos.filter((p) => p.categoria === cat);
}

export function platosAgrupados(): Record<Categoria, Plato[]> {
    return {
        desayuno: platosPorCategoria("desayuno"),
        almuerzo: platosPorCategoria("almuerzo"),
        bebidas: platosPorCategoria("bebidas"),
        kiosco: platosPorCategoria("kiosco"),
    };
}

export function esCategoriaValida(valor: string): valor is Categoria {
    return CATEGORIAS.includes(valor as Categoria);
}