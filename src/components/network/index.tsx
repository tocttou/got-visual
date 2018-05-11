///<reference path="../../declarations.d.ts"/>
import * as React from "react";
import { gotGraphContainerStyle } from "../../global-styles";
import {
  IImmutableInitialState,
  IInitialState
} from "../../reducers/initial-state";
import { connect } from "react-redux";
import * as insightActions from "../../actions/insights-actions";
import { bindActionCreators, Dispatch } from "redux";

interface IProps {
  nodes: IInitialState["network"]["nodes"];
  edges: IInitialState["network"]["edges"];
  clusterOutliers: IInitialState["clusterOutliers"];
}

interface IDispatchProps {
  insightActions: insightActions.IInsightInterface;
}

interface IState {
  nodes: IInitialState["network"]["nodes"];
  edges: IInitialState["network"]["edges"];
  clusterOutliers: IInitialState["clusterOutliers"];
}

class Network extends React.Component<IProps & IDispatchProps, IState> {
  public state = {
    nodes: this.props.nodes,
    edges: this.props.edges,
    clusterOutliers: this.props.clusterOutliers
  };

  private options = {
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: "arrow" },
        from: { enabled: false, scaleFactor: 1, type: "arrow" }
      },
      length: 200
    },
    physics: {
      stabilization: {
        enabled: true,
        iterations: 180, // maximum number of iteration to stabilize
        updateInterval: 100,
        onlyDynamicEdges: false,
        fit: true
      },
      solver: "barnesHut",
      adaptiveTimestep: true
    }
  };

  private network;
  private data;

  public shouldComponentUpdate() {
    return false;
  }

  public componentWillReceiveProps(newProps: IProps) {
    if (
      !newProps.nodes.equals(this.state.nodes) ||
      !newProps.edges.equals(this.state.edges)
    ) {
      this.setState({ nodes: newProps.nodes });
      this.setState({ edges: newProps.edges });
      const container = document.getElementById("got-graph-container");
      this.data.nodes.clear();
      this.data.edges.clear();
      this.data.nodes.add(
        newProps.nodes
          .toIndexedSeq()
          .toArray()
          .map(it => it.toJS())
      );
      this.data.edges.add(
        newProps.edges
          .toIndexedSeq()
          .toArray()
          .map(it => it.toJS())
      );

      this.network.once("startStabilizing", () => {
        const scaleOption = { scale: 0.4 };
        this.network.moveTo(scaleOption);
      });
    }
    this.props.insightActions.updateNumActiveCharacters(this.data.nodes.length);
    this.props.insightActions.updateNumActiveRelationships(
      this.data.edges.length
    );
    if (newProps.clusterOutliers !== this.state.clusterOutliers) {
      this.setState({ clusterOutliers: newProps.clusterOutliers });
      if (newProps.clusterOutliers) {
        this.network.clusterOutliers();
      } else {
        for (const node of this.props.nodes.toArray()) {
          const clusterPath = this.network.clustering.findNode(node.get("id"));
          for (const cluster of clusterPath) {
            if (this.network.isCluster(cluster)) {
              this.network.openCluster(cluster);
            }
          }
        }
      }
    }
  }

  public componentDidMount() {
    const container = document.getElementById("got-graph-container");
    this.data = {
      nodes: new vis.DataSet(this.state.nodes.toJS()),
      edges: new vis.DataSet(this.state.edges.toJS())
    };
    this.network = new vis.Network(container, this.data, this.options);

    this.network.on("doubleClick", properties => {
      const clickedNodeId = properties.nodes;
      if (clickedNodeId.toString().indexOf("cluster") !== -1) {
        if (properties.nodes.length === 1) {
          if (this.network.isCluster(properties.nodes[0]) === true) {
            this.network.openCluster(properties.nodes[0]);
          }
        }
      }
    });
  }

  public render() {
    return <div style={gotGraphContainerStyle} id="got-graph-container" />;
  }
}

function mapStateToProps(state: IImmutableInitialState) {
  return {
    nodes: state.get("network").get("nodes"),
    edges: state.get("network").get("edges"),
    clusterOutliers: state.get("clusterOutliers")
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    insightActions: bindActionCreators(insightActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Network);
