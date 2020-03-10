import * as fs from 'fs-extra';

export interface Copy {
  type: 'Copy';
  src: string;
  dest: string;
  options?: fs.CopyOptions;
}

export interface EmptyDir {
  type: 'EmptyDir';
  path: string;
}

export interface EnsureDir {
  type: 'EnsureDir';
  path: string;
  options?: fs.EnsureOptions | number;
}

export interface EnsureFile {
  type: 'EnsureFile';
  path: string;
}

export interface EnsureLink {
  type: 'EnsureLink';
  src: string;
  dest: string;
}

export interface EnsureSymlink {
  type: 'EnsureSymlink';
  src: string;
  dest: string;
  linkType?: fs.SymlinkType;
}

export interface Mkdirp {
  type: 'Mkdirp';
  path: string;
}

export interface Mkdirs {
  type: 'Mkdirs';
  dir: string;
}

export interface Move {
  type: 'Move';
  src: string;
  dest: string;
  options?: fs.MoveOptions;
}

export interface OutputFile {
  type: 'OutputFile';
  file: string;
  data: any;
  options?: fs.WriteFileOptions | string;
}

export interface OutputJson {
  type: 'OutputJson';
  file: string;
  data: any;
  options?: fs.WriteOptions;
}

export interface PathExists {
  type: 'PathExists';
  path: string;
}

export interface ReadJson {
  type: 'ReadJson';
  file: string;
  options?: fs.ReadOptions;
}

export interface Remove {
  type: 'Remove';
  dir: string;
}

export interface WriteJson {
  type: 'WriteJson';
  file: string;
  object: any;
  options?: fs.WriteOptions;
}

export type FsOperation =
  | Copy
  | EmptyDir
  | EnsureDir
  | EnsureFile
  | EnsureLink
  | EnsureSymlink
  | Mkdirp
  | Mkdirs
  | Move
  | OutputFile
  | OutputJson
  | PathExists
  | ReadJson
  | Remove
  | WriteJson;

// https://medium.com/@fillopeter/pattern-matching-with-typescript-done-right-94049ddd671c
// 1. Convert discriminated union to union of its discriminants
export type Discriminants = FsOperation['type'];

// 2.a. Convert discriminated union to map of discriminant to its type
type AbstractTypeMap<T> = {
  [key in Discriminants]: T extends { type: key } ? T : never;
};

type FsOperationMap = AbstractTypeMap<FsOperation>;

// 3. Convert map of discriminant to its type to map of discriminant to function with its type as a parameter
export type Pattern<ReturnType> = {
  [key in keyof FsOperationMap]: (x: FsOperationMap[key]) => ReturnType;
};
