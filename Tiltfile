docker_compose(
    './docker/compose.yaml',
    env_file='./.env'
)

local_resource(
    'frontend',
    cmd='cd apps/frontend; yarn dev',
    deps=[
        'apps/frontend/src',
        'apps/frontend/package.json',
        'apps/frontend/yarn.lock',
        'apps/frontend/public',
    ],
)