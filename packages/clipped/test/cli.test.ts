import test from 'ava'

import {cli} from '../src/cli'

test('cli should work without parameters', async t => t.true(await cli()))

test('cli should run action when given action', async t => t.true(await cli({action: 'version'})))
