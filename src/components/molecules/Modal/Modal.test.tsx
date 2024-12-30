import React, { useContext } from 'react';
import { Text } from 'react-native';

import { fireEvent, render } from '@test-utils';

import { Modal } from './Modal';
import { ModalPortal } from './ModalPortal';
import { ModalProvider } from './ModalProvider';
import { ModalContext, initialValue } from './context';
import { useModal } from './hooks';

const modalContent = <Text>Test Modal Content</Text>;

describe('Modal', () => {
  it('renders children correctly', () => {
    const setIsOpen = jest.fn();
    const { getByText } = render(
      <ModalContext.Provider value={{ ...initialValue, setIsOpen }}>
        <Modal>{modalContent}</Modal>
      </ModalContext.Provider>,
    );

    expect(getByText('Test Modal Content')).toBeTruthy();
  });

  it('toggles modal state on background press', () => {
    const setIsOpen = jest.fn();
    const { getByTestId } = render(
      <ModalContext.Provider
        value={{ ...initialValue, setIsOpen, isOpen: true }}>
        <Modal>{modalContent}</Modal>
      </ModalContext.Provider>,
    );

    fireEvent.press(getByTestId('modal-background'));

    expect(setIsOpen).toHaveBeenCalled();
  });

  it('does not toggle state when pressing inside the modal', () => {
    const setIsOpen = jest.fn();
    const { getByText } = render(
      <ModalContext.Provider value={{ ...initialValue, setIsOpen }}>
        <Modal>{modalContent}</Modal>
      </ModalContext.Provider>,
    );

    fireEvent.press(getByText('Test Modal Content'));

    expect(setIsOpen).not.toHaveBeenCalled();
  });
});

describe('ModalPortal', () => {
  it('renders Modal when isOpen is true', () => {
    const { getByText } = render(
      <ModalProvider>
        <ModalContext.Provider
          value={{ ...initialValue, isOpen: true, modalContent }}>
          <ModalPortal />
        </ModalContext.Provider>
      </ModalProvider>,
    );

    expect(getByText('Test Modal Content')).toBeTruthy();
  });

  it('does not render Modal when isOpen is false', () => {
    const { queryByText } = render(
      <ModalProvider>
        <ModalContext.Provider
          value={{ ...initialValue, isOpen: false, modalContent }}>
          <ModalPortal />
        </ModalContext.Provider>
      </ModalProvider>,
    );

    expect(queryByText('Test Modal Content')).toBeNull();
  });
});

describe('ModalProvider', () => {
  it('provides modal state and functionality', () => {
    const TestComponent = () => {
      const { setIsOpen, isOpen } = useContext(ModalContext);

      return (
        <>
          <Text onPress={() => setIsOpen(true)}>Open Modal</Text>
          {isOpen && <Text>Modal is Open</Text>}
        </>
      );
    };

    const { getByText } = render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );

    expect(getByText('Open Modal')).toBeTruthy();

    fireEvent.press(getByText('Open Modal'));

    expect(getByText('Modal is Open')).toBeTruthy();
  });
});

describe('ModalContext', () => {
  it('provides the correct initial value', () => {
    const TestComponent = () => {
      const context = React.useContext(ModalContext);

      return (
        <React.Fragment>
          <Text testID="isOpen">{context.isOpen ? 'true' : 'false'}</Text>
        </React.Fragment>
      );
    };

    const { getByTestId } = render(
      <ModalContext.Provider value={initialValue}>
        <TestComponent />
      </ModalContext.Provider>,
    );

    expect(getByTestId('isOpen').props.children).toBe('false');
  });

  it('provides default functions for setModalContent and setIsOpen', () => {
    const TestComponent = () => {
      const context = React.useContext(ModalContext);

      return (
        <React.Fragment>
          <Text testID="setModalContent">
            {context.setModalContent.toString()}
          </Text>
          <Text testID="setIsOpen">{context.setIsOpen.toString()}</Text>
        </React.Fragment>
      );
    };

    const { getByTestId } = render(
      <ModalContext.Provider value={initialValue}>
        <TestComponent />
      </ModalContext.Provider>,
    );

    expect(getByTestId('setModalContent').props.children).toBe(
      initialValue.setModalContent.toString(),
    );
    expect(getByTestId('setIsOpen').props.children).toBe(
      initialValue.setIsOpen.toString(),
    );
  });

  it('should have the correct initial structure and values', () => {
    expect(initialValue).toHaveProperty('setModalContent');
    expect(initialValue).toHaveProperty('isOpen');
    expect(initialValue).toHaveProperty('setIsOpen');

    expect(initialValue.setModalContent).toBeInstanceOf(Function);
    expect(initialValue.isOpen).toBe(false);
    expect(initialValue.setIsOpen).toBeInstanceOf(Function);

    expect(initialValue.setModalContent()).toBeUndefined();
    expect(initialValue.setIsOpen()).toBeUndefined();
  });
});

const TestComponent = () => {
  const modal = useModal();
  return (
    <React.Fragment>
      <Text testID="isOpen">{modal.isOpen ? 'true' : 'false'}</Text>
      <Text testID="setModalContent">{modal.setModalContent.toString()}</Text>
      <Text testID="setIsOpen">{modal.setIsOpen.toString()}</Text>
    </React.Fragment>
  );
};

describe('useModal', () => {
  it('should return the correct initial values from ModalContext', () => {
    const { getByTestId } = render(
      <ModalContext.Provider value={initialValue}>
        <TestComponent />
      </ModalContext.Provider>,
    );

    expect(getByTestId('isOpen').props.children).toBe('false');

    expect(getByTestId('setModalContent').props.children).toBe(
      initialValue.setModalContent.toString(),
    );
    expect(getByTestId('setIsOpen').props.children).toBe(
      initialValue.setIsOpen.toString(),
    );
  });
});
