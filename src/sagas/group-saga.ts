import * as Immutable from "immutable";
import { put, select, takeLatest } from "redux-saga/effects";
import { WATCH_FOR_GROUP, GROUP } from "../actions/action-types";
import { IGroup } from "../actions/group-actions";
import { IInitialState } from "../reducers/initial-state";
import { changeNetwork } from "../actions/network-actions";

const getState = state => state;

export function* takeAction(action: IGroup) {
  const state = yield select(getState);
  switch (action.payload.group) {
    case "none": {
      yield put(
        changeNetwork(
          state
            .get("network")
            .set("nodes", revertNodeColor(state.get("network").get("nodes")))
        )
      );
      break;
    }
    case "sex": {
      yield put(
        changeNetwork(
          state
            .get("network")
            .set(
              "nodes",
              changeNodeColor("sex", state.get("network").get("nodes"))
            )
        )
      );
      break;
    }
    case "houseName": {
      yield put(
        changeNetwork(
          state
            .get("network")
            .set(
              "nodes",
              changeNodeColor("houseName", state.get("network").get("nodes"))
            )
        )
      );
    }
  }
  yield put({ ...action, ...{ type: GROUP } });
}

export function* watchGroup() {
  yield takeLatest(WATCH_FOR_GROUP, takeAction);
}

const colorMap = {
  sex: {
    male: "blue",
    female: "pink",
    unknownsex: "#d3d3d3"
  },
  houseName: {
    Stark: "#C08080",
    Targaryen: "#C0C000",
    Baratheon: "#FFC040",
    Lannister: "#d3d3d3",
    Greyjoy: "#80FFC0",
    Tyrell: "#40FF80",
    Martell: "#C0FFFF",
    Frey: "#80C0FF",
    Tully: "#40C0FF",
    commonfolk: "#FFC0FF"
  }
};

function changeNodeColor(
  selector: string,
  nodesObject: IInitialState["network"]["nodes"]
) {
  const list = nodesObject
    .toKeyedSeq()
    .toArray()
    .map(it => it.toJS());
  const json = list.map(it => ({
    ...it,
    color: {
      border: colorMap[selector][it[selector]],
      background: colorMap[selector][it[selector]]
    }
  }));
  return Immutable.fromJS(json);
}

function revertNodeColor(nodesObject: IInitialState["network"]["nodes"]) {
  const list = nodesObject
    .toKeyedSeq()
    .toArray()
    .map(it => it.toJS());
  return Immutable.fromJS(
    list.map(it => ({
      ...it,
      color: {
        border: "#d3d3d3",
        background: "#d3d3d3"
      }
    }))
  );
}
