import type {
  ModalContextState,
  ModalProviderProps,
} from "contexts/modal/types";
import useModalContextState from "contexts/modal/useModalContextState";
import contextFactory from "utils/contextFactory";

const { Consumer, Provider, useContext } = contextFactory<
  ModalContextState,
  Omit<ModalProviderProps, "children">
>(useModalContextState);

export {
  Consumer as ModalConsumer,
  Provider as ModalProvider,
  useContext as useModal,
};
