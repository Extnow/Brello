import { useState } from 'react';

import {
  Avatar,
  Burger,
  Button,
  Container,
  Grid,
  Group,
  MantineColor,
  Menu,
  Paper,
  Stack,
  Tabs,
  Text,
  Title,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconLayoutKanban,
  IconLogout,
  IconPlus,
  IconSettings,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import cx from 'clsx';

import classes from './application.module.css';

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

const TAB_DEFAULT = 'Board';
const tabs = [TAB_DEFAULT, 'Members', 'Settings'];

export const Application = () => {
  const [tab, setTab] = useState(TAB_DEFAULT);

  return (
    <div>
      <Header tab={tab} setTab={setTab} />
      {tab === TAB_DEFAULT && <Board />}
    </div>
  );
};

export function Header({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) {
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <Text>Brello</Text>
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconLayoutKanban style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                disabled
              >
                Boards
              </Menu.Item>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                disabled
              >
                Account settings
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSwitchHorizontal style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                disabled
              >
                Change account
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                disabled
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container size="md">
        <Tabs
          variant="outline"
          visibleFrom="sm"
          value={tab}
          onChange={value => setTab(value ?? TAB_DEFAULT)}
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>
            {tabs.map(tab => (
              <Tabs.Tab value={tab} key={tab}>
                {tab}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}

export function Board() {
  return (
    <Container size="md" py="md">
      <Stack>
        <Group w="100%">
          <Text>Board</Text>
        </Group>
        <Grid grow gutter="md">
          <Grid.Col span={4}>
            <KanbanColumn title="To Do" color="teal.1" />
          </Grid.Col>
          <Grid.Col span={4}>
            <KanbanColumn title="In Progress" color="grape.1" />
          </Grid.Col>
          <Grid.Col span={4}>
            <KanbanColumn title="Done" color="gray.1" />
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}

export function KanbanColumn({ title, color }: { title: string; color: MantineColor }) {
  return (
    <Paper p="md" bg={color} radius="md">
      <Title order={4} mb="md">
        {title}
      </Title>
      <Stack gap="xs">
        <KanbanCard />
        <KanbanCard />
        <KanbanCard />
        <KanbanCard />
        <KanbanCard />
        <Button
          fullWidth
          color={color.split('.').shift()}
          variant="light"
          mt="sm"
          leftSection={<IconPlus size={14} />}
        >
          Add card
        </Button>
      </Stack>
    </Paper>
  );
}

function KanbanCard() {
  return (
    <Paper p="md" shadow="xs">
      <Text>Card</Text>
    </Paper>
  );
}
