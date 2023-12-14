// interface IGuidedTourStepsType {
//     selector: string;
//     content: string;
//   }
  
  const guidedSteps = [
    {
      selector: '[data-tour="step-1"]',
      content: 'Enter your task here. 👈',
    },
    {
      selector: '[data-tour="step-2"]',
      content: 'Click on add button, after enter something on Input box.👈',
    },
    {
      selector: '[data-tour="step-3"]',
      content:
        'You will see the list of task here... 👈',
    }
  ];
  
  export { guidedSteps };
  