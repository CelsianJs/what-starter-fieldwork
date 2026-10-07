export const dossiers = {
  'radio-garden': {
    accession: 'FW–01', medium: 'Deterministic drawing',
    question: 'What changes when an image comes with enough information to repeat it?',
    method: 'Keep the seed fixed and move between bands, orbit and mesh. Bands draws points; orbit adds connecting lines; mesh increases the point count. Return to the same seed and mode at the same canvas size to compare like with like.',
    specimens: [
      { label: '01 / bands', text: '84 points. No connecting lines. Notice the space between clusters before assigning a shape.' },
      { label: '02 / orbit', text: 'The same point process with lines connecting each point to the point eleven places ahead.' },
      { label: '03 / mesh', text: '126 points and finer connecting strokes. Density becomes part of the reading.' },
    ],
    observations: ['A seed identifies the drawing process, not its meaning.', 'Canvas dimensions participate in the composition; reproducibility includes the viewport.'],
    limits: 'This is a browser drawing exercise, not a participant study or a field-recording archive. No live model or recorded sound is used.',
  },
  'atlas-of-latents': {
    accession: 'FW–02', medium: 'Authored caption fragments',
    question: 'How much of a scene is supplied by its caption rather than the image?',
    method: 'Read the three authored fragments as labels for the shared specimen below. Compare the associations each label introduces. These fragments demonstrate a possible taxonomy; they are not outputs from an inference service.',
    specimens: [
      { label: 'Drawer A / spatial', text: 'A constellation with no agreed center.' },
      { label: 'Drawer B / temporal', text: 'The moment just before a pattern becomes familiar.' },
      { label: 'Drawer C / material', text: 'Dust caught in a machine that has stopped moving.' },
    ],
    observations: ['Spatial, temporal and material labels offer different starting points for the same drawing.', 'Naming a fragment makes it easier to file, but does not settle what it depicts.'],
    limits: 'Three illustrative, locally authored fragments are shown. No generated-caption corpus or measured language experiment is claimed.',
  },
  'signal-commons': {
    accession: 'FW–03', medium: 'Interface notation',
    question: 'What should a shared tool make visible before someone trusts its result?',
    method: 'Use the specimen controls as a small notation exercise. Separate an action, its visible consequence and its boundary. The three cards are authored design notes, not logs from deployed cooperative agents.',
    specimens: [
      { label: 'Action / advance', text: 'New seed → add 137 → redraw. A visible parameter makes the action inspectable.' },
      { label: 'Boundary / repeat', text: 'Reset → seed 3029. Mode remains selected: a reset is not a hidden reset of every control.' },
      { label: 'Ownership / leave', text: 'Leave the specimen route → remove keyboard and resize listeners. A tool should release what it owns.' },
    ],
    observations: ['An accessible button and a keyboard shortcut should name the same action.', 'Cleanup is part of an interface contract even when it is invisible to the visitor.'],
    limits: 'These are illustrative tool-design notes. No collaborative backend, agent execution or tool-use evaluation runs here.',
  },
  'moss-index': {
    accession: 'FW–04', medium: 'Slow-interface field card',
    question: 'Can an interface leave enough quiet for someone to notice a deliberate change?',
    method: 'Let the specimen sit. Change one control, then pause before the next action. This authored field card examines the interface itself: no feed, no countdown and no redraw while idle.',
    specimens: [
      { label: 'Rest / idle', text: 'The drawing remains still until a seed, mode or viewport change asks it to redraw.' },
      { label: 'Gesture / one step', text: 'A single button press changes one source of truth. The new seed is named beside the specimen.' },
      { label: 'Return / familiar', text: 'Reset to a known seed, keep the chosen mode, and let a familiar composition become a reference.' },
    ],
    observations: ['Stillness is a real interaction state, not a loading state.', 'A repeatable return gives a slow interface a useful point of comparison.'],
    limits: 'This is an illustrative interface reflection, not five measured rests or a behavioral research result.',
  },
};
