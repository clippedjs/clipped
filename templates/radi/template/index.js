import Radi from 'radi'
import App from './App'

class Hello extends Radi.component {
  state() {
    return { sample: 'World' };
  }
  view() {
    return (
      <App/>
    )
  }
}

Radi.mount(<Hello />, document.body);
