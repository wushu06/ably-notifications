import * as React from 'react';
import './styles.scss';
declare type MyCallback = () => void;
export declare function useRealTimeNotification(user: object, token: string, callback: MyCallback): {};
export declare type ICounterProps = {
    className?: string;
};
declare const App: React.FC<ICounterProps>;
export default App;
