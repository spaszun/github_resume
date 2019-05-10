import React from "react";
import { Flex } from "@rebass/grid";

const icons = [
  {
    name: "search",
    component: ({ width, height, fill }) => (
      <svg viewBox="0 0 129 129" version="1.1" width={width} height={height}>
        <g>
          <path
            d="M51.6,96.7c11,0,21-3.9,28.8-10.5l35,35c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2c1.6-1.6,1.6-4.2,0-5.8l-35-35   c6.5-7.8,10.5-17.9,10.5-28.8c0-24.9-20.2-45.1-45.1-45.1C26.8,6.5,6.5,26.8,6.5,51.6C6.5,76.5,26.8,96.7,51.6,96.7z M51.6,14.7   c20.4,0,36.9,16.6,36.9,36.9C88.5,72,72,88.5,51.6,88.5c-20.4,0-36.9-16.6-36.9-36.9C14.7,31.3,31.3,14.7,51.6,14.7z"
            fill={fill}
          />
        </g>
      </svg>
    )
  },
  {
    name: "plus",
    component: ({ width, height, fill }) => (
      <svg x="0px" y="0px" viewBox="0 0 42 42" width={width} height={height}>
        <polygon
          points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 "
          fill={fill}
        />
      </svg>
    )
  },
  {
    name: "signIn",
    component: ({ width, height, fill }) => (
      <svg viewBox="0 0 32 32" width={width} height={height}>
        <g id="Sign_In">
          <path
            d="M31,0H17c-0.552,0-1,0.448-1,1s0.448,1,1,1h13v28H17c-0.552,0-1,0.448-1,1s0.448,1,1,1h14   c0.552,0,1-0.448,1-1V1C32,0.448,31.552,0,31,0z"
            fill={fill}
          />
          <path
            d="M16.393,22.3c-0.391,0.395-0.391,1.034,0,1.428c0.391,0.395,1.024,0.395,1.414,0l6.899-6.999   c0.385-0.389,0.389-1.04,0-1.429l-6.9-6.999c-0.391-0.395-1.024-0.394-1.414,0c-0.391,0.394-0.391,1.034,0,1.428l5.2,5.275H1   c-0.552,0-1,0.452-1,1.01c0,0.558,0.448,1.01,1,1.01h20.593L16.393,22.3z"
            fill={fill}
          />
        </g>
      </svg>
    )
  },
  {
    name: "expandMore",
    component: props => (
      <Flex
        {...props}
        style={{
          width: props.width,
          height: props.height,
          color: props.fill,
          border: `1px solid ${props.fill}`
        }}
        alignItems="center"
        justifyContent="center"
      >
        +
      </Flex>
    )
  },
  {
    name: "expandLess",
    component: props => (
      <Flex
        {...props}
        style={{
          width: props.width,
          height: props.height,
          color: props.fill,
          border: `1px solid ${props.fill}`
        }}
        alignItems="center"
        justifyContent="center"
      >
        -
      </Flex>
    )
  },
  {
    name: "edit",
    component: ({ width, height, fill }) => (
      <svg viewBox="0 0 18 18" width={width} height={height}>
        <g id="create">
          <path
            d="M0,14.2 L0,18 L3.8,18 L14.8,6.9 L11,3.1 L0,14.2 L0,14.2 Z M17.7,4 C18.1,3.6 18.1,3 17.7,2.6 L15.4,0.3 C15,-0.1 14.4,-0.1 14,0.3 L12.2,2.1 L16,5.9 L17.7,4 L17.7,4 Z"
            fill={fill}
          />
        </g>
      </svg>
    )
  },
  {
    name: "myCards",
    component: ({ width, height, fill }) => (
      <svg viewBox="0 0 500 500" width={width} height={height}>
        <g id="myCards">
          <path
            d="M245.457,322.41c-10.177-12.902-19.076-19.266-41.159-21.435  c-4.003-0.729-6.904-4.18-6.904-8.272c0-3,9.814-11.993,9.716-12.082c10.185-10.267,15.633-26.893,15.633-39.707  c0-19.891-17.62-36.34-40.886-36.34c-23.716,0-40.883,16.449-40.883,36.34c0,12.901,5.358,29.616,15.536,39.891  c0,0,9.812,8.897,9.812,11.897c0,4.268-3.272,7.905-7.63,8.447c-21.63,2.183-30.351,8.544-40.431,21.26  c-2.822,3.726-4.455,11.08-4.543,14.994v17.078c0,7.544,6.264,13.63,13.992,13.63h108.298c7.728,0,13.992-6.086,13.992-13.63  v-17.078C249.912,333.49,248.358,326.136,245.457,322.41z M354.482,222.745h-45.427c-12.536,0-22.715,10.177-22.715,22.713  c0,12.537,10.179,22.715,22.715,22.715h45.427c12.536,0,22.716-10.179,22.716-22.715  C377.198,232.921,367.019,222.745,354.482,222.745z M354.482,304.514h-45.427c-12.536,0-22.715,10.175-22.715,22.715  c0,12.536,10.179,22.711,22.715,22.711h45.427c12.536,0,22.716-10.175,22.716-22.711  C377.198,314.688,367.019,304.514,354.482,304.514z M31.949,413.539c0,20.079,16.264,36.341,36.34,36.341h363.421  c20.078,0,36.34-16.262,36.34-36.341V122.803c0-20.077-16.262-36.34-36.34-36.34H322.685V70.109c0-11.08-8.91-19.989-19.991-19.989  H197.306c-11.083,0-19.989,8.909-19.989,19.989v16.354H68.29c-20.077,0-36.34,16.263-36.34,36.34V413.539z M97.367,131.889h79.95  v16.354c0,11.081,8.907,19.989,19.989,19.989h105.387c11.081,0,19.991-8.908,19.991-19.989v-16.354h79.949  c11.084,0,19.99,8.909,19.99,19.991v232.586c0,11.08-8.906,19.987-19.99,19.987H97.367c-11.083,0-19.991-8.907-19.991-19.987V151.88  C77.375,140.798,86.284,131.889,97.367,131.889z"
            fill={fill}
          />
        </g>
      </svg>
    )
  }
];

export default icons;