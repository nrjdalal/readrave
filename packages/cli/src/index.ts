#!/usr/bin/env node
import { init } from '@/src/commands/init'
import { sync } from '@/src/commands/sync'
import { Command } from 'commander'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

async function main() {
  const program = new Command()
  program.addCommand(init).addCommand(sync)
  program.parse()
}

main()
