import { Component } from "react";
const wrappedPromise = function() {
  var wrappedPromise = {},
    promise = new Promise(function(resolve, reject) {
      wrappedPromise.resolve = resolve;
      wrappedPromise.reject = reject;
    });
  wrappedPromise.then = promise.then.bind(promise);
  wrappedPromise.catch = promise.catch.bind(promise);
  wrappedPromise.promise = promise;

  return wrappedPromise;
};

class FusionTableLayer extends Component {
  componentDidMount() {
    this.layerPromise = wrappedPromise();
    this.renderLayer();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.map !== prevProps.map ||
      this.props.layerOption !== prevProps.layerOption
    ) {
      if (this.layer) {
        this.layer.setMap(null);
        this.renderLayer();
      }
    }
  }

  componentWillUnmount() {
    if (this.layer) {
      this.layer.setMap(null);
    }
  }
  renderLayer = () => {
    const { map, google, layerOption } = this.props;
    if (!google) return null;
    this.layer = new google.maps.FusionTablesLayer(layerOption);
    this.layer.setMap(map);
    this.layerPromise.resolve(this.layer);
  };
  render() {
    return null;
  }
}

export default FusionTableLayer;
