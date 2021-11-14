import { animateScroll } from "./animateScroll";

const getElementPosition = (element: HTMLElement) => element.offsetTop;

interface IScrollTo {
  id: string;
  ref?: any;
  duration?: number;
}

export const scrollTo = ({ id, ref = null, duration = 3000 }: IScrollTo) => {
  // the position of the scroll bar before the user clicks the button
  const initialPosition = window.scrollY;

  // decide what type of reference that is
  // if neither ref or id is provided  set element to null
  const element = ref ? ref.current : id ? document.getElementById(id) : null;

  if (!element) {
    // log error if the reference passed is invalid
    console.error(
      "Invalid element: please make sure that elemnt's if or React Ref provided"
    );
    return;
  }

  animateScroll({
    targetPosition: getElementPosition(element),
    initialPosition,
    duration,
  });
};
