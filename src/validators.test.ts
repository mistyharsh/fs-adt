import { Copy } from './FsType';
import { validateFS } from './validators';

describe.only('FS Validators', () => {

  it('copy - positive 1', () => {

    const copy: Partial<Copy> = {
      type: 'Copy',
      src: 'some-source-path',
      dest: 'some-dest-path'
    };

    const result = validateFS.validate(copy);

    if (result.error) {
      throw (result.error);
    }
  });

  it('copy - positive 2', () => {

    const copy: Partial<Copy> = {
      type: 'Copy',
      src: 'some-source-path',
      dest: 'some-dest-path',
      options: {
        filter: () => true
      }
    };

    const result = validateFS.validate(copy);

    if (result.error) {
      throw (result.error);
    }
  });

});
