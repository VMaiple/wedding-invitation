import { Variants } from 'framer-motion';

export const envelopeVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay: 0.3,
    },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

export const envelopeFlapVariants: Variants = {
  closed: {
    rotateX: 0,
    originY: 0,
    zIndex: 2,
  },
  opened: {
    rotateX: 180,
    originY: 0,
    zIndex: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

export const envelopeContentVariants: Variants = {
  hidden: {
    y: 0,
    opacity: 0,
  },
  visible: {
    y: -30,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay: 0.5,
    },
  },
  exit: {
    y: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6,
      duration: 0.5,
    },
  },
};

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
