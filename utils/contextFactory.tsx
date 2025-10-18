import { createContext, JSX, useContext } from "react";

type ProcessProviderProps = {
  children: React.ReactNode;
  initialMcKey?: string;
};

const contextFactory = <T,>(
  useContextState: (_initialMcKey?: string) => T,
  ContextComponent?: React.ComponentType,
): {
  Consumer: React.Consumer<T>;
  Provider: (_props: ProcessProviderProps) => JSX.Element;
  useContext: () => T;
} => {
  const Context = createContext<T>({} as T);
  const ProcessProvider = ({
    children,
    initialMcKey,
  }: ProcessProviderProps): JSX.Element => (
    <Context.Provider value={useContextState(initialMcKey)}>
      {children}
      {ContextComponent ? <ContextComponent /> : <></>}
    </Context.Provider>
  );

  return {
    Consumer: Context.Consumer,
    Provider: ProcessProvider,
    useContext: () => useContext(Context),
  };
};

export default contextFactory;
