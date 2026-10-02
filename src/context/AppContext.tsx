import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

import { Plato } from "../data/platos";
import { Pila } from "../estructuras/Pila";
import { Cola } from "../estructuras/Cola";

export interface Pedido {
    numero: number;
    items: Plato[];
    nota: string;
    fecha: Date;
}

interface AppContextType {
  // Sesión
    usuario: string | null;
    iniciarSesion: (nombre: string) => void;
    cerrarSesion: () => void;

  // Carrito
    carrito: Plato[];
    agregarAlCarrito: (plato: Plato) => void;
    deshacerUltimo: () => void;
    limpiarCarrito: () => void;
    carritoVacio: boolean;
    totalCarrito: number;
    puedeDeshacer: boolean;

  // Nota del carrito
    nota: string;
    setNota: (n: string) => void;

  // Pedidos
    confirmarPedido: () => number;
    atenderSiguiente: () => void;
    pedidoActual: Pedido | undefined;
    pedidosEnEspera: Pedido[];
    cantidadEnEspera: number;
    historialAtendidos: Pedido[];
    posicionEnCola: (numero: number) => number;
}

const AppContext = createContext<AppContextType | null>(null);

interface Props {
    children: ReactNode;
}

export function AppProvider({ children }: Props) {
    const [usuario, setUsuario] = useState<string | null>(null);
    const [carrito, setCarrito] = useState<Plato[]>([]);
    const [nota, setNota] = useState("");
    const [proximoTurno, setProximoTurno] = useState(1);

    const [, setTick] = useState(0);
    const forzarRender = () => setTick((t) => t + 1);

    const [pilaDeshacer] = useState(() => new Pila<Plato>());
    const [cola] = useState(() => new Cola<Pedido>());
    const [atendidos] = useState(() => new Pila<Pedido>());

  // ───── Sesión ─────

    const iniciarSesion = (nombre: string) => {
        setUsuario(nombre);
    };

    const cerrarSesion = () => {
        setUsuario(null);
    };

  // ───── Carrito ─────

    const agregarAlCarrito = (plato: Plato) => {
        pilaDeshacer.push(plato);
        setCarrito((c) => [...c, plato]);
    };

    const deshacerUltimo = () => {
        if (pilaDeshacer.vacia) return;
        pilaDeshacer.pop();
        setCarrito((c) => c.slice(0, -1));
    };

    const limpiarCarrito = () => {
        setCarrito([]);
        while (!pilaDeshacer.vacia) {
        pilaDeshacer.pop();
        }
        setNota("");
    };

  // ───── Pedidos ─────

    const confirmarPedido = (): number => {
        const numero = proximoTurno;

        const nuevoPedido: Pedido = {
        numero,
        items: [...carrito],
        nota,
        fecha: new Date(),
        };

    cola.encolar(nuevoPedido);
    setProximoTurno((n) => n + 1);
    limpiarCarrito();
    forzarRender();

    return numero;
    };

    const atenderSiguiente = () => {
        if (cola.vacia) return;

        const atendido = cola.desencolar();
        if (atendido) {
        atendidos.push(atendido);
        }

        forzarRender();
    };

    const posicionEnCola = (numero: number): number => {
        const arr = cola.aArray();
        return arr.findIndex((p) => p.numero === numero);
    };

  // ───── Valores derivados (se recalculan en cada render) ─────

    const carritoVacio = carrito.length === 0;
    const puedeDeshacer = !pilaDeshacer.vacia;
    const totalCarrito = carrito.reduce((sum, p) => sum + p.precio, 0);
    const pedidoActual = cola.frente();
    const pedidosEnEspera = cola.aArray();
    const cantidadEnEspera = cola.tamanio;
    const historialAtendidos = [...atendidos.aArray()].reverse();

  // ───── Objeto que se expone a las pantallas ─────

    const value: AppContextType = {
        usuario,
        iniciarSesion,
        cerrarSesion,
        carrito,
        agregarAlCarrito,
        deshacerUltimo,
        limpiarCarrito,
        carritoVacio,
        totalCarrito,
        puedeDeshacer,
        nota,
        setNota,
        confirmarPedido,
        atenderSiguiente,
        pedidoActual,
        pedidosEnEspera,
        cantidadEnEspera,
        historialAtendidos,
        posicionEnCola,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
    }

// ───── Hook de consumo ─────
// Punto único de acceso al contexto desde cualquier pantalla.
// Lanza un error claro si se usa fuera del Provider.

    export function useApp(): AppContextType {
    const ctx = useContext(AppContext);
    if (!ctx) {
        throw new Error("useApp debe usarse dentro de <AppProvider>");
    }
    return ctx;
}