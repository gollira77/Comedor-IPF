import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { Plato } from "../data/platos";
import { Pila } from "../estructuras/Pila";
import { Cola } from "../estructuras/Cola";

// ───── Tipo Pedido ─────

export interface Pedido {
  numero: number;
  items: Plato[];
  nota: string;
  fecha: Date;
}

// ───── Firma del contexto ─────

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
  // Estado estándar
  const [usuario, setUsuario] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<Plato[]>([]);
  const [nota, setNota] = useState("");
  const [proximoTurno, setProximoTurno] = useState(1);

  // Instancias de las clases (lazy init: una sola vez)
  const [pilaDeshacer] = useState(() => new Pila<Plato>());
  const [cola] = useState(() => new Cola<Pedido>());
  const [atendidos] = useState(() => new Pila<Pedido>());

  // ESPEJOS reactivos: arrays sincronizados con las clases.
  // Cada vez que modifiquemos una clase, actualizamos su espejo.
  // Asi React sabe que algo cambio y re-renderiza todo lo que depende.
  const [espejoCola, setEspejoCola] = useState<Pedido[]>([]);
  const [espejoAtendidos, setEspejoAtendidos] = useState<Pedido[]>([]);
  const [espejoDeshacerTamanio, setEspejoDeshacerTamanio] = useState(0);

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
    setEspejoDeshacerTamanio(pilaDeshacer.tamanio);
    setCarrito((c) => [...c, plato]);
  };

  const deshacerUltimo = () => {
    if (pilaDeshacer.vacia) return;
    pilaDeshacer.pop();
    setEspejoDeshacerTamanio(pilaDeshacer.tamanio);
    setCarrito((c) => c.slice(0, -1));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
    while (!pilaDeshacer.vacia) {
      pilaDeshacer.pop();
    }
    setEspejoDeshacerTamanio(0);
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
    setEspejoCola(cola.aArray()); // SINCRONIZAR ESPEJO

    setProximoTurno((n) => n + 1);
    limpiarCarrito();

    return numero;
  };

  const atenderSiguiente = () => {
    if (cola.vacia) return;

    const atendido = cola.desencolar();
    if (atendido) {
      atendidos.push(atendido);
    }

    // SINCRONIZAR AMBOS ESPEJOS
    setEspejoCola(cola.aArray());
    setEspejoAtendidos(atendidos.aArray());
  };

  const posicionEnCola = (numero: number): number => {
    // Usamos el espejo (el valor "visto" por React)
    return espejoCola.findIndex((p) => p.numero === numero);
  };

  // ───── Valores derivados (todos vienen de espejos reactivos) ─────

  const carritoVacio = carrito.length === 0;
  const puedeDeshacer = espejoDeshacerTamanio > 0;
  const totalCarrito = carrito.reduce((sum, p) => sum + p.precio, 0);

  const pedidosEnEspera = espejoCola;
  const pedidoActual = espejoCola[0];
  const cantidadEnEspera = espejoCola.length;

  // Historial: espejo invertido para que el más reciente vaya arriba
  const historialAtendidos = [...espejoAtendidos].reverse();

  // ───── Objeto expuesto ─────

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

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp debe usarse dentro de <AppProvider>");
  }
  return ctx;
}