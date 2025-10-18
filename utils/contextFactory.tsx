import { createContext, JSX, useContext } from "react";

type ContextFactoryProviderProps<TOptions = any> = {
  children: React.ReactNode;
} & TOptions;

const contextFactory = <T, TOptions = any>(
  useContextState: (_options?: TOptions) => T,
  ContextComponent?: React.ComponentType,
): {
  Consumer: React.Consumer<T>;
  Provider: (_props: ContextFactoryProviderProps<TOptions>) => JSX.Element;
  useContext: () => T;
} => {
  const Context = createContext<T>({} as T);
  const ProcessProvider = ({
    children,
    ...options
  }: ContextFactoryProviderProps<TOptions>): JSX.Element => (
    <Context.Provider value={useContextState(options as TOptions)}>
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
