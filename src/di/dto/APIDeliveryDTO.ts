interface IDCarrier {
  id: string
  name: string
  tel: string
}

interface IDFrom {
  name: string
  time: string
  address?: string
}

interface IDTo {
  name: string
  time: string
  address?: string
}

interface IDState {
  id: string
  text: string
}

interface IDList {
  description: string
  location: { name: string }
  status: { id: string, text: string }
  time: string
}

class DCarrier implements IDCarrier {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly tel: string
  ) {}
}

class DFrom implements IDFrom {
  constructor(
    readonly name: string,
    readonly time: string
  ) {}
}

class DTo implements IDTo {
  readonly name: string
  readonly time: string
  constructor(name: string | {name: string}, time: string) {
    this.name = typeof name === 'object' ? name.name : name
    this.time = time
  }
}

class DState implements IDState {
  constructor(
    readonly id: string,
    readonly text: string
  ) {}
}

class DList implements IDList {

  readonly description: string
  readonly location: { name: string }
  readonly status: { id: string, text: string }
  readonly time: string

  constructor(description: string, location: { name: string }, time: string, status?: { id: string, text: string }) {
    this.description = description
    this.location = { name: location.name }
    this.status = status ? { id: status.id, text: status.text } : { id: '', text: '' }
    this.time = time;
  }
}

export interface IAPIDeliveryParams {
  carrier: IDCarrier
  from: IDFrom
  progresses: Array<IDList>
  state: IDState
  to: IDTo
}

export interface IAPIDeliveryDTO {
  carrier: IDCarrier
  from: IDFrom
  progresses: Array<IDList>
  state: IDState
  to: IDTo
}

class APIDeliveryDTO implements IAPIDeliveryDTO {
  
  readonly carrier: IDCarrier
  readonly from: IDFrom
  readonly progresses: Array<IDList>
  readonly state: IDState
  readonly to: IDTo

  constructor(params: IAPIDeliveryParams) {
    const { carrier, from, progresses, state, to } = params
    this.carrier = new DCarrier(carrier.id, carrier.name, carrier.tel)
    this.from = new DFrom(from.name || from.address, from.time)
    this.progresses = progresses.map(list => {
      return new DList(list.description, list.location, list.time, list?.status)
    }).reverse()
    this.state = new DState(state.id, state.text)
    this.to = new DTo(to.name || to.address, to.time)
  }
}

export default APIDeliveryDTO