
'use strict';
import React from 'react';

// Import Storybook
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select } from '@storybook/addon-knobs';


// Import Motocal components
import { HowTo, NiteHowTo, HPChartHowTo, SimulatorHowTo } from '../howto';
import Profile from '../profile';
import { Summon } from '../summon';
import { Chara } from '../chara';
import { Arm } from '../armlist';
import { Result } from '../result';
import Notice from '../notice';
import { CriticalBuffList } from '../components';
import { SwitchComponent } from '../form-components/index'; // XXX


const localeSelector = (groupId) => select('locale', ['ja', 'en', 'zh'], 'ja', groupId);


// Currently, swtich the backend in Storybook only
// This does not effects to the main Motocal contents, during debug tests.
// After pass all requirement, integrate to main code just add "backend" props. (and pass to children like "locale")
const backendSelector = (groupId) => select('backend', ['bootstrap', 'combobox'], 'bootstrap', groupId)



storiesOf('Tab', module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('Player', () => <Profile
        locale={localeSelector('profile-locale')}
        backend={backendSelector('profile-backend')}
        onChange={action('changed')} />)
    .add('Summon', () => <Summon
        locale={localeSelector('summon-locale')}
        backend={backendSelector('summon-backend')}
        onChange={action('changed')} />)
    .add('Chara', () => <Chara
        locale={localeSelector('chara-locale')}
        backend={backendSelector('chara-backend')}
        onChange={action('changed')} />)
    .add('Weapon(Arm)', () => <Arm
        locale={localeSelector('arm-locale')}
        backend={backendSelector('arm-backend')}
        onChange={action('changed')} />);

storiesOf('How To', module)
    .add('About Motocal', () => <HowTo />)
    .add('Nite(DA)', () => <NiteHowTo />)
    .add('HP Chart', () => <HPChartHowTo show="true" />)
    .add('Simulator', () => <SimulatorHowTo />);

storiesOf('Components', module)
    .addDecorator(centered)
    .addDecorator(withKnobs)
    .add('CriticalBuffList (maxCount=5)', () =>
        <CriticalBuffList locale={localeSelector('criticalBuffListA-locale')}
            onBlur={action('onBlur')}
            onCountChange={action('onCountChange')}
            label="criticalBuffA"
            criticalArray={[{value: 0.5, attackRatio: 0.5}]}
            maxCount={5} />)
    .add('CriticalBuffList (truncate=false)', () =>
        <CriticalBuffList locale={localeSelector('criticalBuffListB-locale')}
            onBlur={action('onBlur')}
            onCountChange={action('onCountChange')}
            label="criticalBuffB"
            criticalArray={[]}
            truncate={false} />)
    .add('Switch Form control', () =>
        <SwitchComponent componentClass="select"
            debug={true}
            backend={backendSelector('form-components-backend')}
            onChange={action('onChange')}
            onBlur={action('onBlur')}>
            {[1,2,3,4,5,6,7,8,9].map(value =>
                <option key={value} value={value}>{value}</option>)}
        </SwitchComponent>);

storiesOf('Notice', module)
    .addDecorator(withKnobs)
    .add('notice', () => <Notice locale={localeSelector('notice-locale')} />);