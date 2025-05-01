import '@testing-library/jest-dom';

declare global {
    namespace Vi {
        interface Assertion<T = any> {
            toBeInTheDocument(): void;
        }

        interface AsymmetricMatchersContaining {
            toBeInTheDocument(): void;
        }
    }
}
