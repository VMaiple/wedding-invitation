'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AnimationState = {
  envelopeVisible: boolean;
  envelopeOpened: boolean;
  contentVisible: boolean;
  invitationVisible: boolean;
  invitationOpened: boolean;
  rsvpFormVisible: boolean;
};

type AnimationContextType = {
  state: AnimationState;
  showEnvelope: () => void;
  openEnvelope: () => void;
  showContent: () => void;
  showInvitation: () => void;
  openInvitation: () => void;
  showRsvpForm: () => void;
  resetAnimations: () => void;
};

const initialState: AnimationState = {
  envelopeVisible: false,
  envelopeOpened: false,
  contentVisible: false,
  invitationVisible: false,
  invitationOpened: false,
  rsvpFormVisible: false,
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AnimationState>(initialState);

  const showEnvelope = () => {
    setState((prev) => ({ ...prev, envelopeVisible: true }));
  };

  const openEnvelope = () => {
    setState((prev) => ({ ...prev, envelopeOpened: true }));
  };

  const showContent = () => {
    setState((prev) => ({ ...prev, contentVisible: true }));
  };

  const showInvitation = () => {
    setState((prev) => ({ ...prev, invitationVisible: true }));
  };

  const openInvitation = () => {
    setState((prev) => ({ ...prev, invitationOpened: true }));
  };

  const showRsvpForm = () => {
    setState((prev) => ({ ...prev, rsvpFormVisible: true }));
  };

  const resetAnimations = () => {
    setState(initialState);
  };

  return (
    <AnimationContext.Provider
      value={{
        state,
        showEnvelope,
        openEnvelope,
        showContent,
        showInvitation,
        openInvitation,
        showRsvpForm,
        resetAnimations,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
