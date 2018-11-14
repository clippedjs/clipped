import Radi from 'radi'

class Hello extends Radi.component {
  state() {
    return { sample: 'World' };
  }
  view() {
    return (
      <h1>Hello { this.state.sample } !</h1>
    )
  }
}

Radi.mount(<Hello />, document.body);
