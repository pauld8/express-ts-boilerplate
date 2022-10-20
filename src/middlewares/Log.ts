import * as fs from 'fs';
import * as path from 'path';
import Env from '../../src/loaders/Env';

export const LOGS = {
  DATABASE: 'database',
};

class Log {
  public baseDir: string;
  public fileName: string;
  public linePrefix: string;

  public today: Date = new Date();

  constructor() {
    let _dateString = `${this.today.getDate()}-${
      this.today.getMonth() + 1
    }-${this.today.getFullYear()}`;
    let _timeString = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;

    this.baseDir =
      process.env.NODE_ENV == 'development'
        ? path.join(__dirname, '../../logs/')
        : '/logs';

    this.fileName = `${_dateString}.log`;
    this.linePrefix = `[${_dateString} ${_timeString}]`;
  }

  // Adds INFO prefix string to the log string
  public info(_string: string, _type = 'default'): void {
    this.addLog('INFO', _string, true, _type);
  }

  // Adds WARN prefix string to the log string
  public warn(_string: string, _print: boolean = true): void {
    this.addLog('WARN', _string, _print);
  }

  // Adds ERROR prefix string to the log string
  public error(
    _string: string,
    _print: boolean = true,
    _printExtra: boolean = false
  ): void {
    // Line break and show the first line
    if (_print) {
      console.log(
        '\x1b[31m%s\x1b[0m',
        '[ERROR] :: ' + _string.split(/r?\n/)[0]
      );
    }

    this.addLog('ERROR', _string, _printExtra, 'errors');
  }

  public database(_string: string, _print: boolean = true): void {
    this.addLog('INFO', _string, true, 'database');
    // this.addLog('INFO', _string, Env.config().development, 'database');
  }

  // Adds the custom prefix string to the log string
  public custom(
    _filename: string,
    _string: string,
    _print: boolean = true
  ): void {
    this.addLog(_filename, _string, _print);
  }

  /**
   * Creates the file if does not exist, and
   * append the log kind & string into the file.
   */
  private addLog(
    _kind: string,
    _string: string,
    _print: boolean = true,
    _type: string = 'default'
  ): void {
    const _that = this;
    _kind = _kind.toUpperCase();

    if (_print) {
      console.log(`${_that.linePrefix} [${_kind}] ${_string}`);
    }

    let dir: string = this.baseDir;

    if (_type != 'default') {
      dir = `${dir}/${_type}`;
    }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.open(`${dir}/${_that.fileName}`, 'a', (_err, _fileDescriptor) => {
      if (!_err && _fileDescriptor) {
        // Append to file and close it
        fs.appendFile(
          _fileDescriptor,
          `${_that.linePrefix} [${_kind}] ${_string}\n`,
          (_err) => {
            if (!_err) {
              fs.close(_fileDescriptor, (_err) => {
                if (!_err) {
                  return true;
                } else {
                  return console.log(
                    '\x1b[31m%s\x1b[0m',
                    'Error closing log file that was being appended'
                  );
                }
              });
            } else {
              return console.log(
                '\x1b[31m%s\x1b[0m',
                'Error appending to the log file'
              );
            }
          }
        );
      } else {
        return console.log(
          '\x1b[31m%s\x1b[0m',
          "Error cloudn't open the log file for appending"
        );
      }
    });
  }

  /**
   * Deletes the log files older than 'X' days
   *
   * Note: 'X' is defined in .env file
   */
  public clean(): void {
    //
  }
}

export default new Log();
