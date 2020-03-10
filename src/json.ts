import * as fs from 'fs-extra';
import { FsOperation, Pattern } from './FsType';


const match: Pattern<Promise<any>> = {

  Copy: (x) =>  fs.copy(x.src, x.dest, x.options),

  EmptyDir: (x) => fs.emptyDir(x.path),

  EnsureDir: (x) => fs.ensureDir(x.path, x.options),

  EnsureFile: (x) => fs.ensureFile(x.path),

  EnsureLink: (x) => fs.ensureLink(x.src, x.dest),

  EnsureSymlink: (x) => fs.ensureSymlink(x.src, x.dest, x.linkType),

  Mkdirp: (x) => fs.mkdirp(x.path),

  Mkdirs: (x) => fs.mkdirs(x.dir),

  Move: (x) => fs.move(x.src, x.dest, x.options),

  OutputFile: (x) => fs.outputFile(x.file, x.data, x.options),

  OutputJson: (x) => fs.outputJSON(x.file, x.data, x.options),

  PathExists: (x) => fs.pathExists(x.path),

  ReadJson: (x) => fs.readJSON(x.file, x.options),

  Remove: (x) => fs.remove(x.dir),

  WriteJson: (x) => fs.writeJSON(x.file, x.object, x.options)
};


export async function perform(operation: FsOperation) {
  const result = await match[operation.type](operation as any);

  return { result };
}
