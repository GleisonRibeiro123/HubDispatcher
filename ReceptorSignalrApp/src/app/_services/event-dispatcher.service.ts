import { Injectable } from '@angular/core';

// EventHander - estrutura que armazera a logica de tratamento das informações para ser executado quando recebe a menssagem.
export type EventHandler = (...args: any[]) => any;

// @Injectable({
//   providedIn: 'root',
// })
export class EventDispatcherService {
  // MAP - armazera os EventHandles para cada tipo de mensagem (onde será repassado nos componentes)
  private static c = new Map<string, EventHandler[]>();

  /**
   * Subscribe to an event topic. Events that get posted to that topic will trigger the provided handler.
   *
   * @param topic the topic to subscribe to
   * é o TYPED (Ex: ntf que usamos no postman)
   * @param handler the event handler
   * é a logica que sera no subcribe
   */

  // Recebe topic (lugar onde será recebido pela interface) e o handler: o que tem que ser feito.
  static subscribe(topic: string, ...handlers: EventHandler[]) {
    let topics = this.c.get(topic);
    if (!topics) {
      this.c.set(topic, topics = []);
    }
    // PUSH - pegando o handler e armazenando no array de TOPICs
    topics.push(...handlers);
  }

  /**
   * Unsubscribe from the given topic. Your handler will no longer receive events published to this topic.
   *
   * @param topic the topic to unsubscribe from
   * @param handler the event handler
   *
   * @return true if a handler was removed
   */

  // Oposto do Subcribe
  static unsubscribe(topic: string, handler?: EventHandler): boolean {
    if (!handler) {
      return this.c.delete(topic);
    }

    const topics = this.c.get(topic);
    if (!topics) {
      return false;
    }

    // We need to find and remove a specific handler
    const index = topics.indexOf(handler);

    if (index < 0) {
      // Wasn't found, wasn't removed
      return false;
    }
    topics.splice(index, 1);
    if (topics.length === 0) {
      this.c.delete(topic);
    }
    return true;
  }

  /**
   * Publish an event to the given topic.
   *
   * @param topic the topic to publish to
   * @param eventData the data to send as the event
   */
  // Publish - libera para que os componentes recebam as informações/dados
  // Faz a execução do handles encontrado no 'Map'
  static publish(topic: string, ...args: any[]): any[] | null {
    const topics = this.c.get(topic);
    if (!topics) {
      return null;
    }
    // .map - tem como função de executar os metodos handlers e retornar um array com os resultados obtidos.
    return topics.map(handler => {
      try {
        return handler(...args);
      } catch (e) {
        console.error(e);
        return null;
      }
    });
  }
}
