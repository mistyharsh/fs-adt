import J from '@hapi/joi';

const writeOptions = J.object({
  encoding: J.string(),
  flag: J.string(),
  mode: J.number()
});


export const copySchema = J.object({
  type: J.valid('Copy').required(),

  src: J.string().required(),
  dest: J.string().required(),

  options: J.object({
    dereference: J.boolean(),
    overwrite: J.boolean(),
    preserveTimestamps: J.boolean(),
    errorOnExist: J.boolean(),
    filter: J.function(),
    recursive: J.boolean(),
  })
});


export const emptyDir = J.object({
  type: J.valid('EmptyDir').required(),

  path: J.string().required()
});


export const ensureDir = J.object({
  type: J.valid('EnsureDir').required(),

  path: J.string().required(),
  options: J.alternatives(
    J.number(),
    J.object({
      mode: J.number()
    })
  )
});


export const ensureFile = J.object({
  type: J.valid('EnsureFile').required(),

  path: J.string().required()
});


export const ensureLink = J.object({
  type: J.valid('EnsureLink').required(),

  src: J.string().required(),
  dest: J.string().required()
});


export const ensureSymlink = J.object({
  type: J.valid('EnsureSymlink').required(),

  src: J.string().required(),
  dest: J.string().required(),
  linkType: J.valid('dir', 'file')
});


export const mkdirp = J.object({
  type: J.valid('Mkdirp').required(),

  path: J.string().required(),
});


export const mkdirs = J.object({
  type: J.valid('Mkdirs').required(),

  dir: J.string().required(),
});


export const move = J.object({
  type: J.valid('Move').required(),

  src: J.string().required(),
  dest: J.string().required(),

  options: {
    overwrite: J.boolean(),
    limit: J.number()
  }
});


export const outputFile = J.object({
  type: J.valid('OutputFile').required(),

  file: J.string().required(),
  data: J.any().required(),

  options: J.object({
    encoding: J.string(),
    flag: J.string(),
    mode: J.number()
  })
});


export const outputJson = J.object({
  type: J.valid('OutputJson').required(),

  file: J.string().required(),
  data: J.any().required(),

  options: writeOptions
});


export const pathExists = J.object({
  type: J.valid('PathExists').required(),

  path: J.string().required(),
});


export const readJson = J.object({
  type: J.valid('ReadJson').required(),

  file: J.string().required(),
  options: J.object({
    throws: J.boolean(),
    fs: J.object(),
    reviver: J.any(),
    encoding: J.string(),
    flag: J.string()
  })
});


export const remove = J.object({
  type: J.valid('Remove').required(),

  dir: J.string().required(),
});


export const writeJson = J.object({
  type: J.valid('WriteJson').required(),

  file: J.string().required(),
  object: J.object(),
  options: writeOptions
});


export const validateFS = J.alternatives(
  copySchema,
  emptyDir,
  ensureFile,
  ensureLink,
  ensureSymlink,
  mkdirp,
  mkdirs,
  move,
  outputFile,
  outputJson,
  pathExists,
  readJson,
  remove,
  writeJson
);
