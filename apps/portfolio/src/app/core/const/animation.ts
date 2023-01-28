import {
  trigger,
  style,
  animate,
  transition,
  group,
  query,
  animateChild,
  keyframes
} from '@angular/animations';

export const AnimationQuery = [
  trigger('query', [
    transition(':enter', [
      style({ height: 0 }),
      group([
        animate(500, style({ height: '*' })),
        query('h3', [
          style({ opacity: 0, transform: 'scale(0)' }),
          animate(2000, style({ opacity: 1, transform: 'scale(1)' }))
        ], {optional: true}),
        query('.tx-left', [
          style({ transform: 'translateX(100%)'}),
          animate('.7s 500ms ease-in', style({ transform: 'translateX(0)' }))
        ], {optional: true}),
        query('.tx-right', [
          style({ transform: 'translateX(-100%)'}),
          animate('.7s 500ms ease-in', style({ transform: 'translateX(0)' }))
        ], {optional: true}),
      ]),
    ]),
  ])
];
